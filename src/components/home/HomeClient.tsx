"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  RefreshCw,
  Eye,
  Star,
  MoveRight,
} from "lucide-react";
import { ProductI, BrandI } from "@/types/product.type";
import AddToCartBtn from "../cart/AddToCartBtn";
import { CardDescription } from "../ui/card";
import AddToWishlistBtn from "../wishlist/AddToWishlistBtn";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    btn1: {
      label: "Shop Now",
      href: "/products",
      style: "bg-white border-2 border-white/50 text-green-500 hover:scale-105",
    },
    btn2: {
      label: "View Deals",
      href: "/deals",
      style:
        "bg-transparent border-2 border-white/50 text-white hover:scale-105",
    },
  },
  {
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    btn1: {
      label: "Shop Now",
      href: "/products",
      style: "bg-white border-2 border-white/50 text-blue-500 hover:scale-105",
    },
    btn2: {
      label: "Learn More",
      href: "/about",
      style:
        "bg-transparent border-2 border-white/50 text-white hover:scale-105",
    },
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    btn1: {
      label: "Order Now",
      href: "/products",
      style:
        "bg-white border-2 border-white/50 text-purple-500 hover:scale-105",
    },
    btn2: {
      label: "Delivery Info",
      href: "/delivery",
      style:
        "bg-transparent border-2 border-white/50 text-white hover:scale-105",
    },
  },
];

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => {
    const full = i < Math.floor(rating);
    const half = !full && i < rating;
    return (
      <div key={i} className="relative w-4.5 h-4.5">
        <Star className="w-4.5 h-4.5 text-[#fdc700] fill-none absolute top-0 left-0" />
        {(full || half) && (
          <div
            className={`absolute top-0 left-0 overflow-hidden ${half ? "w-1/2" : "w-full"}`}
          >
            <Star className="w-4.5 h-4.5 text-[#fdc700] fill-[#fdc700]" />
          </div>
        )}
      </div>
    );
  });
};



export default function HomeClient({
  categories,
  products,
}: {
  categories: BrandI[];
  products: ProductI[];
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  function goTo(index: number, dir: "left" | "right") {
    setDirection(dir);
    setCurrent(index);
  }

  const prev = () =>
    goTo((current - 1 + slides.length) % slides.length, "left");
  const next = () => goTo((current + 1) % slides.length, "right");

  return (
    <>
      <style>{`
        @keyframes enterFromRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes enterFromLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .enter-right { animation: enterFromRight 0.4s ease forwards; }
        .enter-left { animation: enterFromLeft 0.4s ease forwards; }
      `}</style>
      {/* Hero Slider */}
      <div className="relative w-full h-100 overflow-hidden">
        {slides.map((slide, i) =>
          i === current ? (
            <div
              key={i}
              className={`absolute inset-0 bg-cover bg-center ${direction === "right" ? "enter-right" : "enter-left"}`}
              style={{
                backgroundImage:
                  "url('https://freshcart-route.vercel.app/_next/static/media/home-slider-1.d79601a8.png')",
              }}
            >
              <div className="w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50 py-20 p-4">
                <div className="container mx-auto h-full mr-2.5 content-center">
                  <h2 className="text-white text-3xl font-bold mb-4  max-w-96">
                    {slide.title}
                  </h2>
                  <p className="text-white">{slide.subtitle}</p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={slide.btn1.href}
                      className={`inline-block px-6 py-2 rounded-lg font-semibold transition-transform ${slide.btn1.style}`}
                    >
                      {slide.btn1.label}
                    </Link>
                    <Link
                      href={slide.btn2.href}
                      className={`inline-block px-6 py-2 rounded-lg font-semibold transition-transform ${slide.btn2.style}`}
                    >
                      {slide.btn2.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null,
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? "w-6 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-green-500 hover:text-green-600 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="w-6.5 h-6.5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-green-500 hover:text-green-600 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ChevronRight className="w-6.5 h-6.5" />
        </button>
      </div>
      {/* Features Bar */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                color: "bg-blue-50 text-blue-500",
                title: "Free Shipping",
                sub: "On orders over 500 EGP",
                path: "M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z",
                viewBox: "0 0 576 512",
              },
              {
                color: "bg-emerald-50 text-emerald-500",
                title: "Secure Payment",
                sub: "100% secure transactions",
                path: "M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z",
                viewBox: "0 0 512 512",
              },
              {
                color: "bg-orange-50 text-orange-500",
                title: "Easy Returns",
                sub: "14-day return policy",
                path: "M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z",
                viewBox: "0 0 512 512",
              },
              {
                color: "bg-purple-50 text-purple-500",
                title: "24/7 Support",
                sub: "Dedicated support team",
                path: "M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z",
                viewBox: "0 0 448 512",
              },
            ].map(({ color, title, sub, path, viewBox }) => (
              <div
                key={title}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className={`${color} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
                >
                  <svg
                    viewBox={viewBox}
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <path d={path} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Shop By Category */}
      <section className="container mx-auto px-4 py-18">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#1e2939] flex items-center gap-2 mb-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <span className="ml-1">
              Shop By <span className="text-emerald-600 ">Category</span>
            </span>
          </h2>
          <Link
            href="/categories"
            className="text-green-600 hover:text-green-700 font-medium text-[16px]  flex items-center gap-1  -mt-4 transition-colors"
          >
            View All Categories <MoveRight className="w-5.5 h-5.5 ml-1.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-50 relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
      {/* Promo Banners */}
      <section className="py-10 mb-4.5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Banner 1 */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>🔥</span>
                  <span>Deal of the Day</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Fresh Organic Fruits
                </h3>
                <p className="text-white/80 mb-4">
                  Get up to 40% off on selected organic fruits
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">40% OFF</div>
                  <div className="text-sm text-white/70">
                    Use code:{" "}
                    <span className="font-bold text-white">ORGANIC40</span>
                  </div>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                  <svg
                    viewBox="0 0 512 512"
                    className="w-4 h-4"
                    fill="currentColor"
                  >
                    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>✨</span>
                  <span>New Arrivals</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Exotic Vegetables
                </h3>
                <p className="text-white/80 mb-4">
                  Discover our latest collection of premium vegetables
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">25% OFF</div>
                  <div className="text-sm text-white/70">
                    Use code:{" "}
                    <span className="font-bold text-white">FRESH25</span>
                  </div>
                </div>
                <Link
                  href="/products?sort=newest"
                  className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Explore Now
                  <svg
                    viewBox="0 0 512 512"
                    className="w-4 h-4"
                    fill="currentColor"
                  >
                    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-[#1e2939] flex items-center gap-2 mb-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <span className="ml-1">
            Featured <span className="text-emerald-600 ">Products</span>
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <React.Fragment key={product._id}>
              <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Cover Image */}
                <div className="relative w-full aspect-square">
                  {product.priceAfterDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[12px] font-medium px-2 py-1 rounded z-10">
                      -
                      {Math.round(
                        (1 - product.priceAfterDiscount / product.price) * 100,
                      )}
                      %
                    </div>
                  )}
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    quality={100}
                    className="object-contain"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <AddToWishlistBtn prodId={product._id} />

                    <button className="w-8 h-8 cursor-pointer rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors hover:[&>svg]:text-[#16a34a]">
                      <RefreshCw
                        size={17}
                        className="text-[#4a5565] transition-colors"
                      />
                    </button>

                    <Link href={`/products/${product._id}`}>
                      <button className="w-8 h-8 cursor-pointer rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors hover:[&>svg]:text-[#16a34a]">
                        <Eye
                          size={17}
                          className="text-[#4a5565] transition-colors"
                        />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="text-[#6a7282] font-medium text-[12px]">
                    {product.category?.name}
                  </p>
                  <Link href={`/products/${product._id}`}>
                    <h3
                      className="text-[16px] font-medium text-[#364153] line-clamp-2 hover:text-[#15803d] transition-colors cursor-pointer"
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                  </Link>

                  <CardDescription className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.ratingsAverage)}
                    </div>
                    <span className="text-[#6a7282] text-[11px] font-medium">
                      {product.ratingsAverage} ({product.ratingsQuantity})
                    </span>
                  </CardDescription>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[18px] font-bold ${product.priceAfterDiscount ? "text-[#16a34a]" : "text-[#1e2939]"}`}
                      >
                        {product.priceAfterDiscount
                          ? product.priceAfterDiscount
                          : product.price}{" "}
                        EGP
                      </span>
                      {product.priceAfterDiscount && (
                        <span className="text-[14px] font-medium text-[#6a7282] line-through">
                          {product.price} EGP
                        </span>
                      )}
                    </div>

                    <AddToCartBtn prodId={product._id} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-linear-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
              {/* BG Blobs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
                {/* Left */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                      >
                        <path d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                        Newsletter
                      </h3>
                      <p className="text-xs text-gray-500">
                        50,000+ subscribers
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                      Get the Freshest Updates{" "}
                      <span className="text-emerald-600">Delivered Free</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-lg">
                      Weekly recipes, seasonal offers & exclusive member perks.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Fresh Picks Weekly", icon: "🌿" },
                      { label: "Free Delivery Codes", icon: "🚚" },
                      { label: "Members-Only Deals", icon: "🏷️" },
                    ].map(({ label, icon }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 bg-white/80 border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm"
                      >
                        <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-sm">
                          {icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form className="pt-2" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="flex-1 pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-base shadow-sm"
                      />
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Subscribe</span>
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                        >
                          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 pl-1">
                      ✨ Unsubscribe anytime. No spam, ever.
                    </p>
                  </form>
                </div>

                {/* Right */}
                <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
                  <div className="h-full flex flex-col justify-center">
                    <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl" />
                      <div className="relative space-y-5">
                        <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
                          📱 MOBILE APP
                        </div>
                        <h3 className="text-2xl font-bold leading-tight">
                          Shop Faster on Our App
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Get app-exclusive deals & 15% off your first order.
                        </p>
                        <div className="flex flex-col gap-3 pt-2">
                          <a
                            href="#"
                            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                          >
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 384 512"
                              fill="currentColor"
                            >
                              <path d="M319.1 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7-55.8 .9-115.1 44.5-115.1 133.2 0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.5 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                            </svg>
                            <div className="text-left">
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                Download on
                              </div>
                              <div className="text-sm font-semibold -mt-0.5">
                                App Store
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                          >
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 448 512"
                              fill="currentColor"
                            >
                              <path d="M293.6 234.3L72.9 13 353.7 174.2 293.6 234.3zM15.3 0C2.3 6.8-6.4 19.2-6.4 35.3l0 441.3c0 16.1 8.7 28.5 21.7 35.3L271.9 255.9 15.3 0zM440.5 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM72.9 499L353.7 337.8 293.6 277.7 72.9 499z" />
                            </svg>
                            <div className="text-left">
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                Get it on
                              </div>
                              <div className="text-sm font-semibold -mt-0.5">
                                Google Play
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="flex items-center gap-2 pt-2 text-sm">
                          <span className="text-yellow-400">★★★★★</span>
                          <span className="text-gray-400">
                            4.9 • 100K+ downloads
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Features Bar */}
      <div className="bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Shipping */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 576 512"
                  className="w-5 h-5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Free Shipping
                </h4>
                <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 512 512"
                  className="w-4.5 h-4.5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Easy Returns
                </h4>
                <p className="text-gray-500 text-xs">14-day return policy</p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 512 512"
                  className="w-4.5 h-4.5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Secure Payment
                </h4>
                <p className="text-gray-500 text-xs">100% secure checkout</p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 448 512"
                  className="w-4.5 h-4.5 text-[#16a34a]"
                  fill="currentColor"
                >
                  <path d="M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  24/7 Support
                </h4>
                <p className="text-gray-500 text-xs">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
