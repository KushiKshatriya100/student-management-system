import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export const dynamic = "force-dynamic"; // 🔥 VERY IMPORTANT

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
