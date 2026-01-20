"use client";

import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
