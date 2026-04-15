"use server";

import { getUserToken } from "@/lib/auth";
import { ShippDataI } from "@/types/cart.type";

export async function addProductToCart(productId: string) {

  const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthenticated user. Please log in to add products to the cart.");
    }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

    const data = await response.json();
    return data;

}


export async function getCart() {

  const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthenticated user. Please log in to add products to the cart.");
    }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "GET",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

    const data = await response.json();
    return data;

}


export async function removeProductFromCart(productId: string) {

  const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthenticated user. Please log in to add products to the cart.");
    }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

    const data = await response.json();
    return data;

}


export async function clearCart() {

  const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthenticated user. Please log in to add products to the cart.");
    }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "DELETE",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

    const data = await response.json();
    return data;

}







export async function updateProductFromCart(productId: string, count: number) {

  const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthenticated user. Please log in to add products to the cart.");
    }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ count }),
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

    const data = await response.json();
    return data;

}



export async function  cashCheckOut(cartData: ShippDataI , cartId: string) {

  const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthenticated user. Please log in to add products to the cart.");
    }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
    method: "POST",
    body: JSON.stringify({ cartData }),
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

    const data = await response.json();
    return data;

}
