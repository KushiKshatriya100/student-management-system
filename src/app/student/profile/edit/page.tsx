"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Student } from "@/types/student";

export default function StudentProfileEditPage() {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<Student | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      router.push("/student/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: Student) => {
        setStudent(data);
        setForm(data);
      });
  }, [router]);

  if (!form) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("studentToken");

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      alert("Profile updated successfully ✅");
      router.push("/student/profile");
    } catch {
      alert("Failed to update profile ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Card>
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Edit Profile
          </h1>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Roll Number"
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
            />

            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth.slice(0, 10)}
              onChange={handleChange}
            />

            <Input
              label="Email Address"
              value={form.email}
              disabled
            />
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <Button
              variant="danger"
              onClick={() => router.push("/student/profile")}
            >
              Cancel
            </Button>

            <Button loading={saving} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
