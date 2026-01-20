"use client";

export function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="text-center py-10 text-sm text-gray-500">
      {text}
    </div>
  );
}
