import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-on-primary-container hover:opacity-90",
  secondary:
    "bg-secondary text-on-secondary hover:opacity-90",
  ghost:
    "bg-transparent text-on-surface border border-outline-variant/15 hover:bg-surface-container-low",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[44px] min-w-[44px] px-3 py-1.5 text-sm",
  md: "min-h-[44px] min-w-[44px] px-5 py-2.5 text-sm",
  lg: "min-h-[44px] min-w-[44px] px-7 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
