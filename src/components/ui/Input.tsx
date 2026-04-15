import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  bottomBorderOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, bottomBorderOnly = false, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    const baseClasses =
      "w-full bg-transparent px-3 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 transition-colors duration-200 focus:outline-none disabled:opacity-50";

    const borderClasses = bottomBorderOnly
      ? "border-b border-outline-variant focus:border-secondary"
      : "border border-outline-variant rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseClasses} ${borderClasses} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
