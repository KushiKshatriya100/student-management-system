"use client";

type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "success" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  loading = false,
  variant = "primary",
  type = "submit",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`w-full rounded-md px-4 py-2 text-white text-sm ${
        variants[variant]
      } disabled:opacity-60`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
