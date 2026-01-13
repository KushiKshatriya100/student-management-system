export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          Student Management System
        </h1>

        <p className="text-gray-600 mb-6">
          Manage students efficiently with admin and student access.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/admin/login"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Admin Login
          </a>

          <a
            href="/student/login"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Student Login
          </a>

          


        </div>
      </div>
    </main>
  );
}
