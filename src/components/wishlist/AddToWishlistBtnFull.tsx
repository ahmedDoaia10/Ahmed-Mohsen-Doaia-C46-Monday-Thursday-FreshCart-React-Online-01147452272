"use client";
import { addToWishlist, removeFromWishlist } from "@/actions/wishlist.action";
import { WishlistContext } from "@/provider/wishlist-provider";
import { Heart, Check } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddToWishlistBtnFull({ prodId }: { prodId: string }) {
  const { wishlistIds, getWishlistData } = useContext(WishlistContext);
  const [loading, setLoading] = useState(false);
  const isInWishlist = wishlistIds.includes(prodId);

  async function handleWishlist() {
    setLoading(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(prodId);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(prodId);
        toast.success("Added to wishlist");
      }
      getWishlistData();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleWishlist}
      disabled={loading}
      className={`flex-1 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 cursor-pointer border-2 disabled:opacity-50
        ${isInWishlist
          ? "border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50"
          : "border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-600"
        }`}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : (
        <Heart size={16} className={isInWishlist ? "fill-red-500" : ""} />
      )}
      {isInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
    </button>
  );
}