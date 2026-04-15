"use client";
import { addToWishlist, removeFromWishlist } from "@/actions/wishlist.action";
import { WishlistContext } from "@/provider/wishlist-provider";
import { Heart } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddToWishlistBtn({ prodId }: { prodId: string }) {
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
      className="w-8 h-8 cursor-pointer rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors disabled:opacity-50"
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : (
        <Heart
          size={17}
          className={`transition-colors ${isInWishlist ? "text-red-500 fill-red-500" : "text-[#4a5565]"}`}
        />
      )}
    </button>
  );
}