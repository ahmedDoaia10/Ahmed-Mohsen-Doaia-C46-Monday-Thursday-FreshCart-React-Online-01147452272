"use client";
import { getWishlist } from "@/actions/wishlist.action";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

interface WishlistContextI {
  noOfWishlistItems: number;
  wishlistIds: string[];
  loading: boolean;
  getWishlistData: () => void;
}

export const WishlistContext = createContext<WishlistContextI>({
  noOfWishlistItems: 0,
  wishlistIds: [],
  loading: false,
  getWishlistData: () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const [noOfWishlistItems, setNoOfWishlistItems] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function getWishlistData() {
    try {
      setLoading(true);
      const response = await getWishlist();
      const items = response?.data ?? [];
      console.log(response, "wishlist response"); // شوف الشكل
      setNoOfWishlistItems(items.length);
      setWishlistIds(items.map((item: { _id: string }) => item._id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") return;
    if (status === "authenticated") {
      getWishlistData();
    }
  }, [status]);

  return (
    <WishlistContext.Provider value={{ noOfWishlistItems, wishlistIds, loading, getWishlistData }}>
      {children}
    </WishlistContext.Provider>
  );
}