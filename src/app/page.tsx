import Link from "next/link";

export default function HomePage() {
  return (
    <section className="min-h-screen bg-white flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-3xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900">
          Student Management System
        </h1>

        <p className="mt-4 text-gray-600">
          A secure role-based system for managing students and profiles.
        </p>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/student/login"
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-md text-sm font-medium"
          >
            Student Login
          </Link>

          <Link
            href="/admin/login"
            className="px-6 py-2.5 border rounded-md text-sm font-medium text-gray-800"
          >
            Admin Login
          </Link>
        </div>

        {/* Register */}
        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/student/register"
            className="text-indigo-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
