import { ProductConfig } from './types';

export const sealingMachine: ProductConfig = {
  slug: 'sealing-machine',
  name: 'Portable Mini Sealing Machine',
  badge: '🔥 বেস্টসেলার',
  headline: 'খাবার থাকবে আরও বেশি দিন টাটকা!',
  subheadline:
    'Portable Mini Sealing Machine দিয়ে মাত্র কয়েক সেকেন্ডেই চিপস, বিস্কুট, মসলা, ডাল, চালসহ বিভিন্ন প্যাকেট সহজেই সিল করুন।',

  images: [
    '/img_01.jpeg',
    '/img_02.jpeg',
    '/img_03.jpeg',
    '/img_04.jpeg',
    '/img_05.jpeg',
    '/img_06.jpeg',
  ],
  videoSrc: '/video.mp4',
  videoPoster: '/img_01.jpeg',

  pricing: {
    original: 490,
    current: 350,
    currency: '৳',
  },

  delivery: {
    insideDhaka: 80,
    outsideDhaka: 120,
  },

  benefitsTitle: 'কেন এই Sealing Machine?',
  benefits: [
    'খাবার দীর্ঘ সময় টাটকা রাখে',
    'বাতাস ও আর্দ্রতা ঢুকতে দেয় না',
    'ব্যবহার করা খুবই সহজ',
    'ছোট ও হালকা — যেকোনো জায়গায় রাখা যায়',
    'ভ্রমণে সহজে বহন করা যায়',
    'Battery দিয়ে চলে — কোনো তার নেই',
  ],

  useCasesTitle: 'যেসব জিনিসে ব্যবহার করতে পারবেন',
  useCases: [
    'Chips',
    'Biscuit',
    'Dry Food',
    'Rice',
    'Lentils',
    'Spices',
    'Tea',
    'Coffee',
    'Pet Food',
  ],

  reviews: [
    {
      name: 'রহিম',
      location: 'Dhaka',
      rating: 5,
      text: 'দাম অনুযায়ী অনেক ভালো। পরিবারের সবাই খুশি।',
    },
    {
      name: 'নুসরাত',
      location: 'Sylhet',
      rating: 5,
      text: 'ব্যবহার করা খুব সহজ। Delivery-ও দ্রুত ছিল।',
    },
    {
      name: 'ইমরান',
      location: 'Chattogram',
      rating: 5,
      text: 'চিপস নরম হয়ে যেত, এখন আর হয় না। Best product!',
    },
  ],

faqs: [
  {
    question: "Battery কি Included?",
    answer:
      "জি, ডিভাইসটিতে Built-in Rechargeable Battery রয়েছে। আলাদা কোনো Battery কিনতে হবে না। USB Cable দিয়ে সহজেই চার্জ করে বারবার ব্যবহার করতে পারবেন।",
  },
  {
    question: "Delivery কত দিনে পাবো?",
    answer:
      "ঢাকার ভিতরে ১–২ কার্যদিবস এবং ঢাকার বাইরে ২–৪ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন করা হয়।",
  },
 {
  question: "কীভাবে ব্যবহার করবো?",
  answer:
    "প্রথমে ডিভাইসটি সম্পূর্ণ চার্জ করুন। এরপর Power Button চাপ দিয়ে Machine চালু করুন। এবার প্যাকেটের মুখটি দুই পাশে ধরে Sealing Machine-এর মধ্যে রেখে ধীরে ধীরে সামনে টেনে নিন। কয়েক সেকেন্ডের মধ্যেই প্যাকেটটি শক্তভাবে সিল হয়ে যাবে। ব্যবহার শেষে Power Button চাপ দিয়ে বন্ধ করে রাখুন।"
},
],

  ctaText: '🛒 এখনই অর্ডার করুন',
  formCtaText: 'অর্ডার নিশ্চিত করুন',

  seo: {
    title: 'Mini Sealing Machine — খাবার টাটকা রাখুন | Cash On Delivery Bangladesh',
    description:
      'Portable Mini Sealing Machine। চিপস, বিস্কুট, মসলা সিল করুন সহজে। মাত্র ৳৩৫০। সারা বাংলাদেশে Cash On Delivery।',
  },
};
