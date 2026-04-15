"use server";
import { getUserToken } from "@/lib/auth";

export async function getWishlist() {
  const token = await getUserToken();
  console.log(token, "token in getWishlist");
  if (!token) throw new Error("Unauthenticated");

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: { token: token as string },
    cache: "no-store",
  });
  return response.json();
}

export async function addToWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Unauthenticated");

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: { token: token as string, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return response.json();
}

export async function removeFromWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Unauthenticated");

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token: token as string },
  });
  return response.json();
}