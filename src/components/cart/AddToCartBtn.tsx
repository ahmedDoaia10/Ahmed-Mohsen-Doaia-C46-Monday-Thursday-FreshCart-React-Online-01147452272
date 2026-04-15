"use client";
import { addProductToCart } from "@/actions/cart.action";
import { CartContext } from "@/provider/cart-provider";
import { Plus, Check } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddToCartBtn({ prodId }: { prodId: string }) {

    const {getCartData} = useContext(CartContext)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function addToCart(productId: string) {
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      console.log(response, "add to cart response");
      toast.success(response.message, { duration: 2000, position: "top-right" });
      getCartData()
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error((error as Error).message, { duration: 3000, position: "top-right" });
      redirect("/login")
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={() => addToCart(prodId)}
       disabled={loading || success}
      className="w-10 h-10 rounded-full bg-[#16a34a] hover:bg-[#15803d] flex items-center justify-center cursor-pointer transition-colors  disabled:cursor-not-allowed"
    >
      {loading ? (
        <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : success ? (
        <Check size={21} className="text-white" />
      ) : (
        <Plus size={21} className="text-white" />
      )}
    </button>
  );
}