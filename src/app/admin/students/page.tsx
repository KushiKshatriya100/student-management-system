"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Student } from "@/types/student";

type SortOrder = "asc" | "desc" | "";

export default function AdminStudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  // filters
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  // ✅ PAGINATION
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ PAGINATION DERIVED DATA
  const totalPages = Math.ceil(students.length / PAGE_SIZE);
  const paginatedStudents = students.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  const fetchStudents = async (url: string) => {
    setLoading(true);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchStudents(`${process.env.NEXT_PUBLIC_API_URL}/admin/students`);
  }, [router, token]);

  // ✅ RESET PAGE ON DATA CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [students]);

  const applyFilters = () => {
    if (minAge && maxAge) {
      fetchStudents(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/student/students/age?minAge=${minAge}&maxAge=${maxAge}`
      );
      return;
    }

    if (sortOrder) {
      fetchStudents(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/student/students/sort?order=${sortOrder}`
      );
      return;
    }

    fetchStudents(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/student/students`
    );
  };

  const resetFilters = () => {
    setSortOrder("");
    setMinAge("");
    setMaxAge("");

    fetchStudents(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/student/students`
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      setDeleting(id);
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/student/students/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStudents((prev) => prev.filter((s) => s._id !== id));
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage Students
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            View and manage registered students
          </p>
        </div>

        <Card>
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <Input
              label="Min Age"
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />

            <Input
              label="Max Age"
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Sort by Roll
              </label>

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as SortOrder)
                }
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm"
              >
                <option value="">Select</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button onClick={applyFilters}>Apply</Button>
              <Button variant="danger" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          {students.length === 0 ? (
            <EmptyState title="No students found" />
          ) : (
            <>
              <div className="grid grid-cols-12 px-4 py-3 border-b text-sm font-medium text-gray-600">
                <div className="col-span-3">Name</div>
                <div className="col-span-5">Email</div>
                <div className="col-span-2">Roll</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <div className="divide-y">
                {paginatedStudents.map((s) => (
                  <div
                    key={s._id}
                    className="grid grid-cols-12 px-4 py-4 items-center"
                  >
                    <div className="col-span-3 font-medium text-gray-900">
                      {s.name}
                    </div>

                    <div className="col-span-5 text-sm text-gray-600 break-all">
                      {s.email}
                    </div>

                    <div className="col-span-2 text-sm text-gray-500">
                      {s.rollNumber}
                    </div>

                    <div className="col-span-2 flex justify-end gap-3 text-sm">
                      <button
                        onClick={() =>
                          router.push(`/admin/students/${s._id}`)
                        }
                        className="text-indigo-600 hover:underline"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          router.push(`/admin/students/${s._id}/edit`)
                        }
                        className="text-gray-700 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(s._id)}
                        disabled={deleting === s._id}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        {deleting === s._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ PAGINATION CONTROLS */}
              {students.length > PAGE_SIZE && (
                <div className="mt-6 flex items-center justify-between text-sm px-4">
                  <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <div className="flex gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-3 py-1.5 rounded-md border text-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-3 py-1.5 rounded-md border text-gray-700 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </section>
  );
}
