import React from "react";
import { User } from "lucide-react";
import styles from "./Avatar.module.scss";

export interface AvatarProps {
  size?: "small" | "medium" | "large";
  src?: string;
  alt?: string;
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "large", src, alt = "User avatar", className = "" }, ref) => {
    const avatarClasses = [styles.avatar, styles[size], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={avatarClasses}>
        {src ? (
          <img src={src} alt={alt} className={styles.image} />
        ) : (
          <User className={styles.icon} />
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export default Avatar;
