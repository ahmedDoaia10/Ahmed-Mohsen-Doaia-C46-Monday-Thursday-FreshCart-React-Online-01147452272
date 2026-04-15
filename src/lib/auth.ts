import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export  async function getUserToken() {
  
 const decodedToken = (await cookies()).get("next-auth.session-token")?.value;

 const token = await decode({ token: decodedToken , secret : process.env.NEXTAUTH_SECRET! })

//  console.log(token?.token,"token");
 
 return token?.token
}
