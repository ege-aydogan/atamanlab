import { HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
}

function Icon({ name, className = "", ...props }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
}

export { Icon };
export type { IconProps };
