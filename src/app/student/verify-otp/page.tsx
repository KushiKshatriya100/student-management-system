"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function VerifyOtpClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState<string>(params.get("email") || "");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/student/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!res.ok) throw new Error();
      await res.json();

      setMessage("OTP verified successfully");
      setTimeout(() => router.push("/student/login"), 1500);
    } catch {
      setMessage("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <Card>
        <h1 className="text-xl font-semibold mb-6">Verify OTP</h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button loading={loading}>Verify</Button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4">{message}</p>
        )}
      </Card>
    </div>
  );
}
