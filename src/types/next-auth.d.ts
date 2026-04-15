import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface UserDataI {
    name: string;
    email: string;
    role: string;
    phone?: string; 
  }

  interface User {
    id: string;
    user: UserDataI;
    token: string;
  }

  interface Session {
    token?: string; 
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      phone?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserDataI; 
    idToken?: string;
    token?: string; 
  }
}