import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = "", id, children, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full bg-transparent border border-outline-variant rounded-lg px-3 py-2.5 text-on-surface transition-colors duration-200 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none disabled:opacity-50 ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export type { SelectProps };
