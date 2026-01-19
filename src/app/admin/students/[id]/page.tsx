"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";
import type { Student } from "@/types/student";

export default function AdminViewStudentPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Student[]) => {
        const found = data.find((s) => s._id === id);
        setStudent(found || null);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <Loader />;

  if (!student) {
    return (
      <div className="min-h-screen bg-white py-16 text-center text-gray-600">
        Student not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Student Details
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Read-only student information
              </p>
            </div>

            {/* Edit */}
            <button
              onClick={() => router.push(`/admin/students/${id}/edit`)}
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Edit
            </button>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Full Name" value={student.name} disabled />
            <Input label="Email" value={student.email} disabled />
            <Input label="Roll Number" value={student.rollNumber} disabled />
            <Input
              label="Date of Birth"
              value={student.dateOfBirth.slice(0, 10)}
              disabled
            />
            <Input
              label="Verification Status"
              value={student.isVerified ? "Verified" : "Not Verified"}
              disabled
            />
          </div>

          {/* Footer */}
          <div className="mt-8">
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-600 hover:underline"
            >
              ← Back
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
