"use client";

import { useState, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import { ProductConfig } from "@/lib/products/types";

interface Props {
  product: ProductConfig;
}

interface FormState {
  name: string;
  phone: string;
  address: string;
  deliveryArea: "inside" | "outside";
  quantity: number;
}

interface SuccessState {
  orderId: string;
  orderNumber?: string;
  total: number;
}

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  address: "",
  deliveryArea: "outside",
  quantity: 1,
};

export default function OrderFormSection({ product }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [error, setError] = useState("");

  const { pricing, delivery } = product;

  // Live price calculation
  const deliveryCharge =
    form.deliveryArea === "inside"
      ? delivery.insideDhaka
      : delivery.outsideDhaka;
  const productTotal = pricing.current * form.quantity;
  const grandTotal = productTotal + deliveryCharge;

  const setField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(form.phone.replace(/[\s-]/g, ""))) {
      setError("অনুগ্রহ করে একটি সঠিক বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          name: form.name,
          phone: form.phone,
          address: form.address,
          district: form.deliveryArea === "inside" ? "ঢাকা" : "ঢাকার বাইরে",
          quantity: form.quantity,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess({ orderId: data.orderId, orderNumber: data.orderNumber, total: data.total ?? grandTotal });
        // Scroll success message into view
        setTimeout(() => {
          document
            .getElementById("order-success")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } else {
        setError(data.message ?? "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch {
      setError("Internet সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────
  if (success) {
    return (
      <section
        id="order-form"
        className="py-12"
        style={{
          background: "var(--color-primary-light)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div className="section-container">
          <div
            id="order-success"
            className="card p-8 text-center animate-fade-in-up"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--color-secondary)" }}
            >
              অর্ডার সফল হয়েছে!
            </h2>
            <p
              className="mb-5 text-base"
              style={{ color: "var(--color-muted)" }}
            >
              আপনার অর্ডার পেয়েছি। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।
            </p>

            <div
              className="rounded-xl p-4 mb-5"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex justify-between mb-2">
                <span
                  className="text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  অর্ডার নম্বর
                </span>
                <span
                  className="text-sm font-mono font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  #{success.orderNumber || success.orderId.slice(-8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  className="text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  মোট পরিমাণ
                </span>
                <span
                  className="text-base font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {pricing.currency}
                  {success.total}
                </span>
              </div>
            </div>

            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              🚚 ঢাকার ভিতরে ১-২ দিন · ঢাকার বাইরে ২-৪ দিন
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── Order form ───────────────────────────────────────────
  return (
    <section
      id="order-form"
      className="py-8"
      style={{
        background: "var(--color-primary-light)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="mb-5">
          <h2 className="section-heading mb-1">🛒 এখনই অর্ডার করুন</h2>
          <div
            className="h-0.5 w-12 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
          <p className="text-sm mt-2" style={{ color: "var(--color-muted)" }}>
            নিচের ফর্ম পূরণ করুন — Cash On Delivery-তে পণ্য পাবেন
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-2"
        >
          {/* Name */}
          <div>
            <label htmlFor="order-name" className="form-label">
              নাম *
            </label>
            <input
              id="order-name"
              type="text"
              className="form-input"
              placeholder="আপনার পূর্ণ নাম লিখুন"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="order-phone" className="form-label">
              মোবাইল নম্বর *
            </label>
            <input
              id="order-phone"
              type="tel"
              className="form-input"
              placeholder="01XXXXXXXXX"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              required
              autoComplete="tel"
              inputMode="numeric"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="order-address" className="form-label">
              সম্পূর্ণ ঠিকানা *
            </label>
            <textarea
              id="order-address"
              className="form-input"
              placeholder="গ্রাম/রোড, থানা, জেলা..."
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              required
              rows={3}
              style={{ resize: "none" }}
            />
          </div>

          {/* Delivery Area */}
          <div>
            <label className="form-label">ডেলিভারি এরিয়া *</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <label
                className="flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-colors"
                style={{
                  border: form.deliveryArea === "inside" ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                  background: form.deliveryArea === "inside" ? "var(--color-primary-light)" : "var(--color-surface)",
                }}
              >
                <input
                  type="radio"
                  name="deliveryArea"
                  value="inside"
                  checked={form.deliveryArea === "inside"}
                  onChange={() => setField("deliveryArea", "inside")}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "var(--color-primary)" }}
                />
                <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>ঢাকার ভিতরে</span>
              </label>
              <label
                className="flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-colors"
                style={{
                  border: form.deliveryArea === "outside" ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                  background: form.deliveryArea === "outside" ? "var(--color-primary-light)" : "var(--color-surface)",
                }}
              >
                <input
                  type="radio"
                  name="deliveryArea"
                  value="outside"
                  checked={form.deliveryArea === "outside"}
                  onChange={() => setField("deliveryArea", "outside")}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "var(--color-primary)" }}
                />
                <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>ঢাকার বাইরে</span>
              </label>
            </div>
          </div>

          {/* Quantity stepper */}
          <div>
            <label className="form-label">পরিমাণ</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setField("quantity", Math.max(1, form.quantity - 1))
                }
                aria-label="কমান"
                className="flex items-center justify-center w-12 h-12 rounded-xl text-xl font-bold transition-colors"
                style={{
                  border: "1.5px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-secondary)",
                }}
              >
                −
              </button>
              <span
                className="flex-1 text-center text-2xl font-bold tabular-nums"
                style={{ color: "var(--color-secondary)" }}
              >
                  📦 {form.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setField("quantity", Math.min(10, form.quantity + 1))
                }
                aria-label="বাড়ান"
                className="flex items-center justify-center w-12 h-12 rounded-xl text-xl font-bold transition-colors"
                style={{
                  border: "1.5px solid var(--color-primary)",
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "var(--color-surface)",
              border: "1.5px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3
              className="text-base font-bold mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              অর্ডার সারসংক্ষেপ
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-sm">
                <span style={{ color: "var(--color-muted)" }}>
                  পণ্যের দাম ({pricing.currency}
                  {pricing.current} × {form.quantity})
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {pricing.currency}
                  {productTotal}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span style={{ color: "var(--color-muted)" }}>
                  Delivery চার্জ
                  {form.deliveryArea === "inside" && (
                    <span
                      className="ml-1 text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "var(--color-success-bg)",
                        color: "var(--color-success)",
                      }}
                    >
                      ঢাকা
                    </span>
                  )}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {pricing.currency}
                  {deliveryCharge}
                </span>
              </div>
              <div
                className="flex justify-between items-center pt-3"
                style={{ borderTop: "1px dashed var(--color-border)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "var(--color-secondary)" }}
                >
                  মোট
                </span>
                <span
                  className="text-xl font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {pricing.currency}
                  {grandTotal}
                </span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm font-medium"
              style={{
                background: "#FFF1F1",
                border: "1px solid #FECACA",
                color: "var(--color-error)",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ fontSize: "1.05rem", minHeight: "56px" }}
          >
            {loading ? (
              <>
                <span className="inline-block w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin mr-2" />
                অপেক্ষা করুন...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {product.formCtaText}
              </>
            )}
          </button>

          <p
            className="text-center text-xs"
            style={{ color: "var(--color-muted-light)" }}
          >
            🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। আমরা শুধুমাত্র অর্ডার নিশ্চিত করার জন্য আপনার নম্বরে যোগাযোগ করব।
          </p>
        </form>
      </div>
    </section>
  );
}
