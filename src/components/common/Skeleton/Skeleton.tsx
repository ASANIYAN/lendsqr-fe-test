import React from "react";
import styles from "./Skeleton.module.scss";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = "", ...props }, ref) => {
    const skeletonClasses = [styles.skeleton, className]
      .filter(Boolean)
      .join(" ");

    return <div ref={ref} className={skeletonClasses} {...props} />;
  },
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
