import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export const dynamic = "force-dynamic"; // 🔥 MOST IMPORTANT
export const revalidate = 0;

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
