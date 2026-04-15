import { loginTypeSchema, registerTypeSchema } from "@/schemas/auth.schemas";

export async function registerUser(data: registerTypeSchema) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData?.message || responseData?.error || "Failed to create account");
    }

    return responseData;
}



export async function loginUser(data: loginTypeSchema) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json();   
    return responseData;

}