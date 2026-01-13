import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Student Management System
      </h1>

      <div className="flex gap-4">
        <Link
          href="/"
          className="hover:underline"
        >
          Home
        </Link>

        <Link
          href="/admin/login"
          className="hover:underline"
        >
          Admin
        </Link>

        <Link
          href="/student/login"
          className="hover:underline"
        >
          Student
        </Link>
      </div>
    </nav>
  );
}
