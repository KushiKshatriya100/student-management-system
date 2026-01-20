"use client";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={inputId}
        {...props}
        className={`
          w-full rounded-md border px-3 py-2.5 text-sm
          text-gray-900 placeholder:text-gray-400
          border-gray-300
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          transition
        `}
      />

      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
