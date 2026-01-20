import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export const dynamic = "force-dynamic"; // 🔥 THIS IS REQUIRED
export const revalidate = 0;            // 🔥 EXTRA SAFETY (Vercel)

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
