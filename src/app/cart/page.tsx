"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { clearCart, getCart } from "@/actions/cart.action";
import { CartI, cartProductI } from "@/types/cart.type";
import CartItem from "@/components/cart/cart-item";
import { CartContext } from "@/provider/cart-provider";
import { CartCheckout } from "@/components/order/cart-checkout";

export default function Cart() {
  const [products, setProducts] = useState<cartProductI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingClear, setIsLoadingClear] = useState(false);
  const { getCartData } = useContext(CartContext);

  async function getAllProductCart() {
    try {
      setIsLoading(true);
      const response: CartI = await getCart();
      setProducts(response?.data?.products ?? []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }


  async function clearOurCart() {
    try {
      setIsLoadingClear(true);
      const response = await clearCart();
      setProducts(response.data.products);
      getCartData();
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoadingClear(false);
    }
  }

  useEffect(() => {
    getAllProductCart();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto">
            <svg
              className="animate-spin w-10 h-10"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle cx="20" cy="8" r="3" fill="#16a34a" />
              <circle cx="28.5" cy="11.5" r="3" fill="#16a34a" />
              <circle cx="32" cy="20" r="3" fill="#16a34a" />
              <circle cx="28.5" cy="28.5" r="3" fill="#16a34a" />
              <circle cx="20" cy="32" r="3" fill="#16a34a" />
              <circle cx="11.5" cy="28.5" r="3" fill="#16a34a" />
              <circle cx="8" cy="20" r="3" fill="#16a34a" />
              <circle cx="11.5" cy="11.5" r="3" fill="#16a34a" opacity="0" />
            </svg>
          </div>
          <p className="text-gray-800 font-medium text-lg">
            Loading your cart...
          </p>
          <p className="text-gray-400 text-sm mt-1">Just a moment</p>
        </div>
      </main>
    );
  }

  if (!products || products.length === 0) {
    return (
      <>
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-md">
            {/* Icon */}
            <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                data-prefix="fas"
                data-icon="box-open"
                className="svg-inline--fa fa-box-open w-15 h-12 text-gray-300"
                role="img"
                viewBox="0 0 640 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
                ></path>
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Looks like you haven’t added anything to your cart yet.
              <br />
              Start exploring our products!
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98] cursor-pointer"
            >
              Start Shopping
              <svg
                data-prefix="fas"
                data-icon="arrow-right"
                className="svg-inline--fa fa-arrow-right w-[17.5] h-3.5"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                ></path>
              </svg>
            </Link>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-400 text-sm mb-4">Popular Categories</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Electronics", "Fashion", "Home", "Beauty"].map((cat) => (
                  <Link
                    key={cat}
                    href="/categories"
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Features Bar */}
        <div className="bg-green-50 border-y border-green-100">
          <div className="container mx-auto px-4 py-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <p className="text-gray-500 text-xs">
                    On orders over 500 EGP
                  </p>
                </div>
              </div>
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

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-5">
          <Link href="/" className="hover:text-green-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
            <svg
              data-prefix="fas"
              data-icon="cart-shopping"
              className="svg-inline--fa fa-cart-shopping h-7.5 w-[37.5px] text-white"
              role="img"
              viewBox="0 0 640 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
              ></path>
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>
        <p className="text-gray-500 mb-8 mt-2">
          You have{" "}
          <span className="text-green-600 font-semibold">
            {products.length} items
          </span>{" "}
          in your cart
        </p>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {products.map((product) => (
              <CartItem
                key={product._id}
                item={product}
                setProducts={setProducts}
              />
            ))}

            {/* Bottom Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                href="/products"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors text-sm"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={() => clearOurCart()}
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm cursor-pointer"
              >
                {isLoadingClear ? (
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Clear all items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 self-start sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Header */}
              <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <svg
                    data-prefix="fas"
                    data-icon="bag-shopping"
                    className="svg-inline--fa fa-bag-shopping h-4.5 w-[22.5px] text-white"
                    role="img"
                    viewBox="0 0 448 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M160 80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 384c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48c0-61.9-50.1-112-112-112S112 18.1 112 80l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                    ></path>
                  </svg>
                  <h2 className="text-[18px] font-bold text-white">
                    Order Summary
                  </h2>
                </div>
                <p className="text-green-100 text-sm mt-1">
                  {products.length} items in your cart
                </p>
              </div>

              <div className="p-6 space-y-5">
                {/* Free Shipping Progress */}
                {(() => {
                  const subtotal = products.reduce(
                    (acc, p) => acc + p.price * p.count,
                    0,
                  );
                  const freeShippingThreshold = 500;
                  const remaining = Math.max(
                    0,
                    freeShippingThreshold - subtotal,
                  );
                  const progressPercent = Math.min(
                    (subtotal / freeShippingThreshold) * 100,
                    100,
                  );
                  const shipping = subtotal >= freeShippingThreshold ? 0 : 50;
                  const total = subtotal + shipping;

                  return (
                    <>
                      <div
                        className={`rounded-xl p-4 ${remaining > 0 ? "bg-orange-50" : "bg-green-50"}`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {/* Icon Circle */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center  shrink-0 ${remaining > 0 ? "bg-orange-100" : "bg-green-100"}`}
                          >
                            <svg
                              className={`w-4.5 h-4.5 ${remaining > 0 ? "text-orange-500" : "text-green-600"}`}
                              viewBox="0 0 576 512"
                              fill="currentColor"
                            >
                              <path d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                            </svg>
                          </div>

                          {/* Text */}
                          <div>
                            {remaining > 0 ? (
                              <p className="text-sm font-medium text-gray-700">
                                Add{" "}
                                <span className="text-orange-600 font-bold">
                                  {remaining} EGP
                                </span>{" "}
                                for free shipping
                              </p>
                            ) : (
                              <>
                                <p className="text-[16px] font-semibold text-[#008236]">
                                  Free Shipping!
                                </p>
                                <p className="text-[14px] font-medium mt-0.5 -mb-2.5 text-[#00a63e]">
                                  You qualify for free delivery
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        {remaining > 0 && (
                          <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span className="font-medium text-[#101828]">
                            {subtotal} EGP
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className="font-medium">
                            {shipping === 0 ? (
                              <span className="text-green-600">FREE</span>
                            ) : (
                              `${shipping} EGP`
                            )}
                          </span>
                        </div>
                        <div className="border-t border-gray-100 pt-3 flex justify-between">
                          <span className="font-semibold text-[#101828] text-[16px] mt-1.5">
                            Total
                          </span>
                          <span className="font-bold text-[#101828] text-2xl">
                            {total}{" "}
                            <span className="text-sm font-normal text-[#6a7282]">
                              EGP
                            </span>
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })()}

                {/* Promo Code */}
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all cursor-pointer">
                  <svg
                    data-prefix="fas"
                    data-icon="tag"
                    className="svg-inline--fa fa-tag w-4 h-4"
                    role="img"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                    />
                  </svg>
                  <span className="font-medium text-[14px]">
                    Apply Promo Code
                  </span>
                </button>

                {/* Checkout Button */}

                <CartCheckout />
                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 pt-7">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#6a7282]">
                    <svg
                      data-prefix="fas"
                      data-icon="shield-halved"
                      className="svg-inline--fa fa-shield-halved text-green-500 h-3 w-3.75"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                      ></path>
                    </svg>
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#6a7282]">
                    <svg
                      data-prefix="fas"
                      data-icon="truck"
                      className="svg-inline--fa fa-truck text-blue-500 h-3 w-3.75"
                      role="img"
                      viewBox="0 0 576 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                      ></path>
                    </svg>
                    Fast Delivery
                  </div>
                </div>

                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors text-sm pt-1"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </main>
  );
}
