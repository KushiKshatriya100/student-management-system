"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error();

      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } catch {
      alert("Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Admin Login"
      subtitle="Authorized access only"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="pt-2">
          <Button loading={loading}>
            Login
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
