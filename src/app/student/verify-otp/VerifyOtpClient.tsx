"use client";

import { useSearchParams } from "next/navigation";

export default function VerifyOtpClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) return <p>Invalid request</p>;

  return <div>Verify OTP for {email}</div>;
}
