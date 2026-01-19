"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Student } from "@/types/student";

export default function StudentProfileViewPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);

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
      .then((data: Student) => setStudent(data));
  }, [router]);

  if (!student) return null;

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Card>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {student.name}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {student.email}
            </p>
          </div>

          {/* Profile Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Input label="Full Name" value={student.name} disabled />
            <Input label="Email Address" value={student.email} disabled />
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

          {/* Action */}
          <div className="pt-4 border-t flex justify-end">
            <Button onClick={() => router.push("/student/profile/edit")}>
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
