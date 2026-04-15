import NextAuth, { DefaultSession } from "next-auth";
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
      role?: string;
      phone?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string; 
    user?: {
      name: string;
      email: string;
      role: string;
      phone?: string;
    };
  }
}