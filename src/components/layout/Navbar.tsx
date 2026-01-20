"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setIsOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-18 py-4 flex items-center justify-between">
          {/* Brand Section */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold text-sm">
              SM
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-gray-900">
                Student Management
              </span>
              <span className="text-xs text-gray-500">
                Dashboard System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-10">
            <nav className="flex items-center gap-8 text-sm font-medium text-gray-600">
              {!role && (
                <>
                  <Link
                    href="/student/login"
                    className="hover:text-gray-900 transition"
                  >
                    Student Login
                  </Link>
                  <Link
                    href="/admin/login"
                    className="hover:text-gray-900 transition"
                  >
                    Admin Login
                  </Link>
                </>
              )}

              {role === "student" && (
                <Link
                  href="/student/profile"
                  className="hover:text-gray-900 transition"
                >
                  Profile
                </Link>
              )}

              {role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
              )}
            </nav>

            {/* Action Section */}
            {role && (
              <button
                onClick={handleLogout}
                className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden border-t bg-white">
          <div className="px-6 py-5 space-y-4 text-sm font-medium text-gray-700">
            {!role && (
              <>
                <Link
                  href="/student/login"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  Student Login
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  Admin Login
                </Link>
              </>
            )}

            {role === "student" && (
              <Link
                href="/student/profile"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Profile
              </Link>
            )}

            {role === "admin" && (
              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Dashboard
              </Link>
            )}

            {role && (
              <button
                onClick={handleLogout}
                className="block w-full text-left rounded-md border border-red-200 px-4 py-2 text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
