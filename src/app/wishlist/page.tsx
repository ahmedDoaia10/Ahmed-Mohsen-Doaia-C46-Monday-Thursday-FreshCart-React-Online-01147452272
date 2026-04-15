"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart, ShoppingCart } from "lucide-react";
import { getWishlist, removeFromWishlist } from "@/actions/wishlist.action";
import { addProductToCart } from "@/actions/cart.action";
import { toast } from "sonner";
import { WishlistProduct } from "@/types/cart.type";
import { WishlistContext } from "@/provider/wishlist-provider";
import { CartContext } from "@/provider/cart-provider";

export default function Wishlist() {
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getWishlistData } = useContext(WishlistContext);
  const { getCartData } = useContext(CartContext);
  const [cartIds, setCartIds] = useState<string[]>([]);

  async function fetchWishlist() {
    try {
      setIsLoading(true);
      const response = await getWishlist();
      setProducts(response?.data ?? []);
    } catch {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemove(productId: string) {
    await removeFromWishlist(productId);
    setProducts((prev) => prev.filter((p) => p._id !== productId));
    getWishlistData();
    toast.success("Removed from wishlist");
  }

  async function handleAddToCart(productId: string) {
    await addProductToCart(productId);
    getCartData();
    setCartIds((prev) => [...prev, productId]);
    toast.success("Added to cart");
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-red-300 animate-pulse" />
          </div>
          <p className="text-gray-800 font-medium text-lg">
            Loading your wishlist...
          </p>
        </div>
      </main>
    );
  }

  if (!products || products.length === 0) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-16 h-16 text-red-200" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Save items you love to your wishlist and find them here.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-green-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:bg-green-700 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="container mx-auto px-4 py-8  border-b border-gray-100">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-green-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <Heart className="w-6.25 h-5.5 text-red-500 fill-red-500" />
          </div>
          <div className="ml-1">
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 text-sm">
              {products.length} item saved
            </p>
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-2">
          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-8 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-50">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50/50 transition-colors"
                >
                  {/* Product */}
                  <div className="col-span-6 flex items-center gap-4">
                    <Link
                      href={`/products/${product._id}`}
                      className="relative shrink-0 group"
                    >
                      <div className="relative w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          fill
                          className="object-contain p-3 "
                          sizes="128px"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href={`/products/${product._id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-400 font-medium  mt-1">
                        {product.category?.name}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <span className="font-semibold text-gray-900">
                      {product.priceAfterDiscount ?? product.price} EGP
                    </span>
                    {product.priceAfterDiscount && (
                      <p className="text-[14px] font-medium text-gray-400 line-through">
                        {product.price} EGP
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex justify-center">
                    {cartIds.includes(product._id) ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <ShoppingCart className="w-3 h-3" />
                        In Cart
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    {cartIds.includes(product._id) ? (
                      <Link
                        href="/cart"
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-green-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 text-green-600"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                        >
                          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </svg>
                        View Cart
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer text-gray-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8.5 mb-7 flex items-center justify-between">
            <Link
              className="text-gray-500 hover:text-green-600 text-sm font-medium transition-colors"
              href="/products"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </main>
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
