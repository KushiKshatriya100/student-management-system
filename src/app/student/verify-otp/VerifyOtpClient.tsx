"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyOtpClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      console.log("Email not found in query params");
    }
  }, [email]);

  return (
    <div>
      <h1>Verify OTP</h1>
      <p>Email: {email}</p>
    </div>
  );
}
