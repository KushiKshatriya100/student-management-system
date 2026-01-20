import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP required" },
      { status: 400 }
    );
  }

  if (otp !== "123456") {
    return NextResponse.json(
      { message: "Invalid OTP" },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: "OTP verified" });
}
