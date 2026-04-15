"use client";
import React, { useState } from "react";
import { ProductI } from "@/types/product.type";
import {
  Star,
  Share2,
  Zap,
  Truck,
  RotateCcw,
  Shield,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";
import AddToCartBtnFull from "@/components/cart/AddToCartBtnFull";
import Image from "next/image";
import { CardDescription } from "@/components/ui/card";
import AddToCartBtn from "@/components/cart/AddToCartBtn";
import useEmblaCarousel from "embla-carousel-react";
import AddToWishlistBtnFull from "@/components/wishlist/AddToWishlistBtnFull";
import AddToWishlistBtn from "@/components/wishlist/AddToWishlistBtn";



// Custom Icon Components to fix TS errors
const BoxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 576 512" fill="currentColor" className={className}>
    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 47.9 171.5c-12.1 1.8-22.1 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8l128.1 68.5c10.8 5.7 23.9 4.8 33.8-2.3s14.9-19.3 12.9-31.3L438.2 329 545.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.6-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
  </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 640 512" fill="currentColor" className={className}>
    <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48z" />
  </svg>
);

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => {
    const full = i < Math.floor(rating);
    const half = !full && i < rating;
    return (
      <div key={i} className="relative w-4 h-4">
        <Star className="w-4 h-4 text-[#fdc700] fill-none absolute top-0 left-0" />
        {(full || half) && (
          <div
            className={`absolute top-0 left-0 overflow-hidden ${half ? "w-1/2" : "w-full"}`}
          >
            <Star className="w-4 h-4 text-[#fdc700] fill-[#fdc700]" />
          </div>
        )}
      </div>
    );
  });
};

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: ProductI;
  relatedProducts: ProductI[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [activeTab, setActiveTab] = useState("details");

  const allImages = [
    product.imageCover,
    ...product.images.filter((img) => img !== product.imageCover),
  ];
  const totalPrice = (product.priceAfterDiscount ?? product.price) * quantity;

  const galleryImages = allImages.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <>
      <main className="bg-white">
        {/* Breadcrumb */}
        <div className="">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="hover:text-[#16a34a] transition-colors flex items-center text-[#6a7282] font-medium text-sm gap-1"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="currentColor"
                    >
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/categories/${product.category._id}`}
                    className="hover:text-[#16a34a] transition-colors text-[#6a7282] font-medium text-sm"
                  >
                    {product.category?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#101828] font-medium text-sm">
                    {product.title.length > 50
                      ? product.title.slice(0, 50) + " ..."
                      : product.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-9">
            {/* Left - Images */}
            <div className="lg:w-1/4 shrink-0" style={{ touchAction: "pan-y" }}>
              <div className="lg:sticky lg:top-4 bg-white rounded-xl shadow-sm p-1">
                <ImageGallery
                  items={galleryImages}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showNav={false}
                  thumbnailPosition="bottom"
                  preventDefaultTouchmoveEvent={false}
                />
              </div>
            </div>

            {/* Right - Info */}
            <div className="lg:w-3/4 flex flex-col gap-5 shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/categories/${product.category._id}`}>
                  <span className="bg-green-50 text-green-700 text-[12px] font-medium px-3 py-1.5 rounded-full hover:bg-green-100 transition">
                    {product.category?.name}
                  </span>
                </Link>
                {product.brand && (
                  <span className="px-3 py-1 rounded-full text-gray-600 bg-gray-100 text-[12px] font-medium">
                    {product.brand.name}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.ratingsAverage)}
                </div>
                <span className="text-gray-500 text-sm">
                  {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {product.priceAfterDiscount !== undefined &&
                  product.priceAfterDiscount > 0
                    ? product.priceAfterDiscount
                    : product.price}{" "}
                  EGP
                </span>
                {product.priceAfterDiscount !== undefined && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {product.price} EGP
                    </span>
                    <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Save{" "}
                      {Math.round(
                        (1 - product.priceAfterDiscount / product.price) * 100,
                      )}
                      %
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#008236] font-medium bg-green-50 px-3 py-1  rounded-full ">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  <span className="ml-0.5"> In Stock</span>
                </span>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Quantity
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity === 1}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-[#16a34a] transition disabled:opacity-50 cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                        fill="currentColor"
                      >
                        <path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={product.quantity}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(
                            product.quantity,
                            Math.max(1, Number(e.target.value)),
                          ),
                        )
                      }
                      className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                    />
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.quantity, q + 1))
                      }
                      disabled={quantity === product.quantity}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-[#16a34a] transition disabled:opacity-50 cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                        fill="currentColor"
                      >
                        <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">
                    {product.quantity} available
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="text-2xl font-bold text-[#16a34a]">
                    {totalPrice.toFixed(2)} EGP
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <AddToCartBtnFull prodId={product._id} />
                <Link
                  href="/cart"
                  className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={18} />
                  Buy Now
                </Link>
              </div>

              <div className="flex gap-3">
                <AddToWishlistBtnFull prodId={product._id} />
                <button className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:border-green-300 hover:text-green-600 cursor-pointer text-gray-600 rounded-xl transition-colors">
                  <Share2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                {[
                  {
                    Icon: Truck,
                    title: "Free Delivery",
                    sub: "Orders over $50",
                  },
                  {
                    Icon: RotateCcw,
                    title: "30 Days Return",
                    sub: "Money back",
                  },
                  {
                    Icon: Shield,
                    title: "Secure Payment",
                    sub: "100% Protected",
                  },
                ].map(({ Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center text-center gap-1.5"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                      <Icon size={16} className="text-[#16a34a]" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {title}
                    </span>
                    <span className="text-xs text-gray-400">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Product Details Tabs Section - Compact & Professional Version */}
      <section id="product-details-tabs" className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* 1. Tabs Header (Compact) */}
            <div className="border-b border-gray-100 bg-white">
              <div className="flex overflow-x-auto scrollbar-hide">
                {[
                  { id: "details", label: `Product Details`, icon: BoxIcon },
                  {
                    id: "reviews",
                    label: `Reviews (${product.ratingsQuantity})`,
                    icon: StarIcon,
                  },
                  {
                    id: "shipping",
                    label: "Shipping & Returns",
                    icon: TruckIcon,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 border-b-2 ${
                      activeTab === tab.id
                        ? "text-emerald-600 border-emerald-600 bg-emerald-50/30"
                        : "text-gray-500 border-transparent hover:text-emerald-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tab Content Container (Reduced Padding) */}
            <div className="p-6">
              {/* --- Tab: Product Details --- */}
              {activeTab === "details" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      About this Product
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm max-w-4xl">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Information - Compact Version */}
                    <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-4 text-sm">
                        Product Information
                      </h4>
                      <ul className="space-y-2.5">
                        <li className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">
                            Category
                          </span>
                          <span className="text-gray-900 font-bold">
                            {product.category?.name || "N/A"}
                          </span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">
                            Subcategory
                          </span>
                          <span className="text-gray-900 font-bold">
                            {product.subcategory?.name || "N/A"}
                          </span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">
                            Brand
                          </span>
                          <span className="text-gray-900 font-bold">
                            {product.brand?.name || "N/A"}
                          </span>
                        </li>
                        <li className="flex justify-between items-center text-xs pt-1">
                          <span className="text-gray-500 font-medium">
                            Items Sold
                          </span>
                          <span className="text-emerald-600 font-bold">
                            {product.sold || 0}+ sold
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Features - Compact Version */}
                    <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-4 text-sm">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "Premium Quality Product",
                          "100% Authentic Guarantee",
                          "Fast & Secure Packaging",
                          "Quality Tested",
                        ].map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center text-xs text-gray-600 font-semibold"
                          >
                            <div className="bg-emerald-100 rounded-full p-1 mr-2.5 shrink-0">
                              <svg
                                className="w-3 h-3 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* --- Tab: Reviews --- */}
              {activeTab === "reviews" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex flex-col items-center text-center px-4">
                      <h2 className="text-5xl font-extrabold text-gray-900 mb-1">
                        {product.ratingsAverage}
                      </h2>
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars(product.ratingsAverage)}
                      </div>
                      <p className="text-gray-400 font-bold text-xs">
                        Based on {product.ratingsQuantity} reviews
                      </p>
                    </div>

                    <div className="flex-1 w-full space-y-2.5">
                      {[
                        { s: 5, p: 25 },
                        { s: 4, p: 60 },
                        { s: 3, p: 25 },
                        { s: 2, p: 5 },
                        { s: 1, p: 5 },
                      ].map((item) => (
                        <div key={item.s} className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-500 min-w-10 text-right">
                            {item.s} star
                          </span>
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#fdc700] rounded-full"
                              style={{ width: `${item.p}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-400 min-w-7.5">
                            {item.p}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-8 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border border-gray-50">
                      <StarIcon className="w-6 h-6" />
                    </div>
                    <p className="text-gray-500 font-bold text-sm">
                      Customer reviews will be displayed here.
                    </p>
                    <button className="text-emerald-600 font-bold text-sm hover:underline cursor-pointer">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}

              {/* --- Tab: Shipping & Returns --- */}
              {activeTab === "shipping" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Shipping Compact */}
                    <div className="bg-[#f0fdf4] rounded-xl p-6 border border-[#dcfce7]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md">
                          <Truck className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Shipping Information
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Free shipping on orders over $50",
                          "Standard delivery: 3-5 business days",
                          "Express delivery available",
                          "Track your order in real-time",
                        ].map((t, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-gray-600 font-semibold text-sm"
                          >
                            <svg
                              className="w-4 h-4 text-emerald-600 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Returns Compact */}
                    <div className="bg-[#f0fdf4] rounded-xl p-6 border border-[#dcfce7]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md">
                          <RotateCcw className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Returns & Refunds
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "30-day hassle-free returns",
                          "Full refund available",
                          "Free return shipping",
                          "Easy online process",
                        ].map((t, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-gray-600 font-semibold text-sm"
                          >
                            <svg
                              className="w-4 h-4 text-emerald-600 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">
                        Buyer Protection Guarantee
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        Safe and secure shopping experience ensured.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1e2939] flex items-center gap-2">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
              You May Also <span className="text-emerald-600 ">Like</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors cursor-pointer "
              >
                <ChevronLeft size={23} className="text-gray-600 " />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors cursor-pointer"
              >
                <ChevronRight size={23} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4" style={{ willChange: "transform" }}>
              {relatedProducts.slice(0, 10).map((item) => (
                <div key={item._id} className="flex-none w-55">
                  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="relative w-full aspect-square">
                      {item.priceAfterDiscount !== undefined && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-[12px] font-medium px-2 py-1 rounded z-10">
                          -
                          {Math.round(
                            (1 - item.priceAfterDiscount / item.price) * 100,
                          )}
                          %
                        </div>
                      )}
                      <Image
                        src={item.imageCover}
                        alt={item.title}
                        fill
                        quality={100}
                        className="object-contain"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <AddToWishlistBtn prodId={item._id} />

                        <button className="w-8 h-8 cursor-pointer rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors hover:[&>svg]:text-[#16a34a]">
                          <RefreshCw
                            size={17}
                            className="text-[#4a5565] transition-colors"
                          />
                        </button>

                        <Link href={`/products/${item._id}`}>
                          <button className="w-8 h-8 cursor-pointer rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors hover:[&>svg]:text-[#16a34a]">
                            <Eye
                              size={17}
                              className="text-[#4a5565] transition-colors"
                            />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="p-3 flex flex-col gap-1 flex-1">
                      <p className="text-[#6a7282] font-medium text-[12px]">
                        {item.category?.name}
                      </p>
                      <Link href={`/products/${item._id}`}>
                        <h3
                          className="text-[16px] font-medium text-[#364153] line-clamp-2 hover:text-[#15803d] transition-colors cursor-pointer"
                          title={item.title}
                        >
                          {item.title}
                        </h3>
                      </Link>
                      <CardDescription className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {renderStars(item.ratingsAverage)}
                        </div>
                        <span className="text-[#6a7282] text-[11px] font-medium">
                          {item.ratingsAverage} ({item.ratingsQuantity})
                        </span>
                      </CardDescription>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[18px] font-bold ${item.priceAfterDiscount !== undefined ? "text-[#16a34a]" : "text-[#1e2939]"}`}
                          >
                            {item.priceAfterDiscount !== undefined &&
                            item.priceAfterDiscount > 0
                              ? item.priceAfterDiscount
                              : item.price}{" "}
                            EGP
                          </span>
                          {item.priceAfterDiscount !== undefined && (
                            <span className="text-[14px] font-medium text-[#6a7282] line-through">
                              {item.price} EGP
                            </span>
                          )}
                        </div>
                        <AddToCartBtn prodId={item._id} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
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
