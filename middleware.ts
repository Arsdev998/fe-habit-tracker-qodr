import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token: string, secret: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload; // JWT payload will be returned if valid
  } catch (error) {
    return null; // Invalid token
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret is not defined");
  }

  const payload = await verifyToken(token, secret);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Token is valid, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/habit-tracker",
    "/al-quran",
    "/notifikasi",
    "/user-profile",
    "/admindashboard/habitcontroll",
    "/admindashboard/usercontroll",
  ],
};
