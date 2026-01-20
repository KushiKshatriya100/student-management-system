"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyOtpClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");

  if (!email) {
    return <p>Invalid request</p>;
  }

  return (
    <div>
      <h1>Verify OTP</h1>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
    </div>
  );
}
