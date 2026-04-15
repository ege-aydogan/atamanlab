import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(15,23,42,0.06)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
