import {
  removeProductFromCart,
  updateProductFromCart,
} from "@/actions/cart.action";
import { CartContext } from "@/provider/cart-provider";
import { cartProductI } from "@/types/cart.type";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CartItem({
  item,
  setProducts,
}: {
  item: cartProductI;
  setProducts: (products: cartProductI[]) => void;
}) {
  const { getCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setProductCount(item.count);
  }, [item]);

  async function removeProduct(prodId: string) {
    try {
      setIsLoading(true);
      const response = await removeProductFromCart(prodId);
      toast.success(response.message, {
        duration: 2000,
        position: "top-right",
      });
      setProducts(response.data.products);
      getCartData()
    } catch (error) {
      toast.error((error as Error).message, {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCart(prodId: string, count: number) {
    try {
      setIsLoadingUpdate(true);
      const response = await updateProductFromCart(prodId, count);
      toast.success(response.message, {
        duration: 2000,
        position: "top-right",
      });
      setProducts(response.data.products);
      getCartData()
    } catch (error) {
      toast.error((error as Error).message, {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
      {/* Updating Overlay */}
      {isLoadingUpdate && (
        <div className="absolute inset-0 bg-white/60 rounded-2xl backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
            <svg
              className="animate-spin w-4 h-4 text-green-600"
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
            <span className="text-sm text-gray-500 font-medium">
              Updating...
            </span>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          {/* Image */}
          <Link
            href={`/products/${item.product._id}`}
            className="relative shrink-0 group"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 border border-gray-100 overflow-hidden">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                sizes="128px"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <svg
                className="w-2 h-2"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z" />
              </svg>
              In Stock
            </div>
          </Link>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Title & Category */}
            <div className="mb-3">
              <Link
                href={`/products/${item.product._id}`}
                className="group/title"
              >
                <h3 className="font-semibold text-gray-900 group-hover/title:text-[#16a34a] transition-colors leading-relaxed text-base sm:text-lg">
                  {item.product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                  {item.product.category?.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  SKU: {item.product._id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-green-600 font-bold text-lg">
                  {item.price} EGP
                </span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>

            {/* Quantity & Total */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              {/* Counter */}
              <div className="flex items-center">
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button
                    onClick={() =>
                      updateCart(item.product._id, productCount - 1)
                    }
                    disabled={productCount === 1 || isLoadingUpdate}
                    aria-label="Decrease quantity"
                    className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer"
                  >
                    <Minus className="text-xs w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900">
                    {productCount}
                  </span>
                  <button
                    onClick={() =>
                      updateCart(item.product._id, productCount + 1)
                    }
                    disabled={isLoadingUpdate}
                    aria-label="Increase quantity"
                    className="h-8 w-8 rounded-lg bg-green-600 shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <Plus className="text-xs w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total & Delete */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {item.price * productCount}{" "}
                    <span className="text-sm font-medium text-gray-400">
                      EGP
                    </span>
                  </p>
                </div>
                <button
                  title="Remove item"
                  aria-label="Remove from cart"
                  disabled={isLoading || isLoadingUpdate}
                  className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 cursor-pointer"
                  onClick={() => removeProduct(item.product._id)}
                >
                  {isLoading ? (
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
