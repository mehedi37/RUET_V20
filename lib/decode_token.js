import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function DecodeToken() {
  const token = cookies().get("token")?.value;

  if (!token) {
    console.error("Token not found in cookies");
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
