"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Student } from "@/types/student";

export default function StudentDashboardPage() {
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

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    router.push("/student/login");
  };

  if (!student) return null;

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Card>
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome, {student.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {student.email}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>

          {/* Account Overview */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">
              Account Overview
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-md border px-4 py-3">
                <p className="text-sm text-gray-600">
                  Verification Status
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {student.isVerified ? "Verified" : "Not Verified"}
                </p>
              </div>

              <div className="rounded-md border px-4 py-3">
                <p className="text-sm text-gray-600">
                  Profile
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  Available
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              variant="primary"
              onClick={() => router.push("/student/profile")}
            >
              View Profile
            </Button>

            <Button
              variant="success"
              onClick={() => router.push("/student/profile/edit")}
            >
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
