"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  rollNumber: string;
  dateOfBirth: string;
};

export default function StudentRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/student/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error();

      router.push(`/student/verify-otp?email=${form.email}`);
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Student Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" name="name" onChange={handleChange} />
            <Input label="Email" name="email" onChange={handleChange} />
            <Input label="Roll Number" name="rollNumber" onChange={handleChange} />
            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
            />

            <Button loading={loading}>Register</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
