import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
