"use client";
import { addProductToCart } from "@/actions/cart.action";
import { CartContext } from "@/provider/cart-provider";
import { ShoppingCart, Check } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddToCartBtnFull({ prodId }: { prodId: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
   const {getCartData} = useContext(CartContext)

  async function addToCart(productId: string) {
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      toast.success(response.message, {
        duration: 2000,
        position: "top-right",
      });
      setSuccess(true);
      getCartData()
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      toast.error((error as Error).message, {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={() => addToCart(prodId)}
      disabled={loading || success}
      className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600 cursor-pointer"
    >
      {loading ? (
        <svg
          className="animate-spin w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-40"
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
      ) : success ? (
        <Check size={18} />
      ) : (
        <ShoppingCart size={18} />
      )}
      Add to Cart
    </button>
  );
}
