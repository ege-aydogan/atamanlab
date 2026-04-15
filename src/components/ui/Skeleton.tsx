import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-surface-container-high ${className}`}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
