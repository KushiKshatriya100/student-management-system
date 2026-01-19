"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage system data and administrative operations
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Students */}
          <Card>
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Manage Students
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  View, edit, delete and manage student records
                </p>
              </div>

              <button
                onClick={() => router.push("/admin/students")}
                className="
                  mt-6
                  inline-flex
                  items-center
                  justify-center
                  rounded-md
                  bg-indigo-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  hover:bg-indigo-700
                  transition
                "
              >
                Go to Students
              </button>
            </div>
          </Card>

          {/* Reports (placeholder) */}
          <Card>
            <div className="flex flex-col h-full justify-between opacity-60">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Reports
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  System insights and analytics
                </p>
              </div>

              <button
                disabled
                className="
                  mt-6
                  rounded-md
                  border
                  px-4
                  py-2
                  text-sm
                  text-gray-500
                  cursor-not-allowed
                "
              >
                Coming Soon
              </button>
            </div>
          </Card>

          {/* Settings (placeholder) */}
          <Card>
            <div className="flex flex-col h-full justify-between opacity-60">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  System Settings
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Configure system preferences
                </p>
              </div>

              <button
                disabled
                className="
                  mt-6
                  rounded-md
                  border
                  px-4
                  py-2
                  text-sm
                  text-gray-500
                  cursor-not-allowed
                "
              >
                Coming Soon
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
