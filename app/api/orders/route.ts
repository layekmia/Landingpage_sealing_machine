import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { getProduct } from '@/lib/products';
import { INSIDE_DHAKA_DISTRICT } from '@/lib/districts';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productSlug, name, phone, address, district, quantity } = body;

    // Validate required fields
    if (!productSlug || !name || !phone || !address || !district || !quantity) {
      return NextResponse.json(
        { success: false, message: 'সব তথ্য সঠিকভাবে দিন।' },
        { status: 400 }
      );
    }

    // Validate product exists
    const product = getProduct(productSlug);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product পাওয়া যায়নি।' },
        { status: 404 }
      );
    }

    // Validate quantity
    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
      return NextResponse.json(
        { success: false, message: 'পরিমাণ সঠিক নয়।' },
        { status: 400 }
      );
    }

    // Validate phone (basic: 10-14 digits)
    const phoneClean = String(phone).replace(/\D/g, '');
    if (phoneClean.length < 10 || phoneClean.length > 14) {
      return NextResponse.json(
        { success: false, message: 'সঠিক মোবাইল নম্বর দিন।' },
        { status: 400 }
      );
    }

    // Calculate pricing
    const deliveryCharge =
      district === INSIDE_DHAKA_DISTRICT
        ? product.delivery.insideDhaka
        : product.delivery.outsideDhaka;

    const productPrice = product.pricing.current * qty;
    const total = productPrice + deliveryCharge;

    // Generate unique order number
    const lastOrder = await prisma.order.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { orderNumber: { not: null } },
    });

    let nextNumber = 10001;
    if (lastOrder && lastOrder.orderNumber) {
      const lastNumStr = lastOrder.orderNumber.replace('ORD', '');
      const lastNum = parseInt(lastNumStr, 10);
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }
    const orderNumber = `ORD${nextNumber}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        productSlug,
        name: String(name).trim(),
        phone: phoneClean,
        address: String(address).trim(),
        district: String(district),
        quantity: qty,
        productPrice,
        deliveryCharge,
        total,
        orderNumber,
      },
    });

    // Send Email Notification
    try {
      await resend.emails.send({
        from: 'Omnimart <contact@nexotechit.com>',
        to: 'layekofficial63@gmail.com',
        subject: `New Order Received - ${orderNumber}`,
        html: `
          <h2>New Order Details: ${orderNumber}</h2>
          <p><strong>Product:</strong> ${product.name} (${productSlug})</p>
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phoneClean}</p>
          <p><strong>Address:</strong> ${address}, ${district}</p>
          <p><strong>Quantity:</strong> ${qty}</p>
          <p><strong>Total Amount:</strong> ${total} Taka</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      total,
    });
  } catch (error) {
    console.error('[POST /api/orders]', error);
    return NextResponse.json(
      { success: false, message: 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}
