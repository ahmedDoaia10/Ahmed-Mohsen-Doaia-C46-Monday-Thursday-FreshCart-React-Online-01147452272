"use client";
import { getCart } from "@/actions/cart.action";
import { CartI } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

interface CartContextI {
  noOfCartItems: number;
  Loading: boolean;
  getCartData: ()=> void;
  cartId: string;
}

export const CartContext = createContext<CartContextI>({
  noOfCartItems: 0,
  Loading: false,
  getCartData: ()=> {},
  cartId: ""
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const {data:session , status} = useSession()
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState("");

  

  async function getCartData() {
    try {
      setLoading(true);
      const response: CartI = await getCart();
      console.log(response);
      
      const totalItems = response.data.products.reduce(
        (acc, counter) => acc + counter.count,
        0,
      );
      
      setCartId(response?.cartId)
      setNoOfCartItems(totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  

  useEffect(() => {
    if(status === "unauthenticated") return;
    if(status === "authenticated") {

        getCartData();
    }
  }, [status]);
  return (
    <>
      <CartContext.Provider value={{ noOfCartItems, Loading , getCartData , cartId }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
