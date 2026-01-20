import React from "react";
import styles from "./Badge.module.scss";

export type BadgeVariant = "active" | "inactive" | "pending" | "blacklisted";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, children, className = "", ...props }, ref) => {
    const badgeClasses = [styles.badge, styles[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export default Badge;
