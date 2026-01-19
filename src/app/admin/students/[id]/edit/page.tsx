"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import type { Student } from "@/types/student";

export default function AdminEditStudentPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [form, setForm] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: Student[]) => {
        const found = data.find((s) => s._id === id);
        setForm(found || null);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <Loader />;

  if (!form) {
    return (
      <div className="min-h-screen bg-white py-16 text-center text-gray-600">
        Student not found
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/student/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            rollNumber: form.rollNumber,
            dateOfBirth: form.dateOfBirth,
          }),
        }
      );

      if (!res.ok) throw new Error();

      router.back(); // return to students list
    } catch {
      alert("Failed to update student");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Student
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Update student information
            </p>
          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              value={form.email}
              disabled
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
          </div>

          {/* Actions */}
          <div className="mt-10 pt-6 border-t flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="
                px-4 py-2 rounded-md text-sm
                border border-gray-300
                text-gray-700
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </button>

            <Button
              loading={saving}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
