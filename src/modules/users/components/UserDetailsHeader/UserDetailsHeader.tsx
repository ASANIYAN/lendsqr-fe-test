import React from "react";
import styles from "./UserDetailsHeader.module.scss";
import { Button } from "@/components/common";
import arrow_icon from "@/assets/long-arrow-left-icon.svg";

export interface UserDetailsHeaderProps {
  onBack: () => void;
  onBlacklist: () => void;
  onActivate: () => void;
  className?: string;
}

export const UserDetailsHeader = React.forwardRef<
  HTMLDivElement,
  UserDetailsHeaderProps
>(({ onBack, onBlacklist, onActivate, className = "" }, ref) => {
  const headerClasses = [styles.header, className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={headerClasses}>
      <div className={styles.topSection}>
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
          aria-label="Back to users"
        >
          <img src={arrow_icon} width={30} height={30} alt="left-arrow-icon" />
          <span>Back to Users</span>
        </button>

        <h1 className={styles.title}>User Details</h1>
      </div>

      <div className={styles.actions}>
        <Button
          variant="outlined"
          color="danger"
          size="small"
          uppercase
          onClick={onBlacklist}
        >
          Blacklist User
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="small"
          uppercase
          onClick={onActivate}
        >
          Activate User
        </Button>
      </div>
    </div>
  );
});

UserDetailsHeader.displayName = "UserDetailsHeader";

export default UserDetailsHeader;
