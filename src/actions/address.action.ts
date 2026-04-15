
"use server";

import { getUserToken } from "@/lib/auth";


export async function getAddresses() {
  const token = await getUserToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/addresses`, {
    headers: { token: token as string },
    cache: "no-store",
  });
  const data = await res.json();
  return data.data;
}

export async function addAddress(body: {
  name: string;
  details: string;
  phone: string;
  city: string;
}) {
  const token = await getUserToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/addresses`, {
    method: "POST",
    headers: { token: token as string, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function deleteAddress(id: string) {
  const token = await getUserToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/addresses/${id}`, {
    method: "DELETE",
    headers: { token: token as string },
  });
  const data = await res.json();
  return data;
}