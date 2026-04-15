"use server";

import { getUserToken } from "@/lib/auth";

export async function UpdateProfile(body: {
  name: string;
  email: string;
  phone: string;
}) {
  const token = await getUserToken();
//   console.log("token:", token); // 
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/updateMe/`, {
    method: "PUT",
    headers: { 
      token: token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  
  const data = await res.json();
//   console.log("response:", data); // 
  return data;
}


export async function GetProfile() {
  const token = await getUserToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/getMe`, {
    headers: { token: token as string },
  });
  const data = await res.json();
  console.log(data);
  return data;
}




export async function UpdatePassword(body: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  const token = await getUserToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}