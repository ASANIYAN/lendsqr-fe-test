import React, { useState } from "react";
import { Star } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import styles from "./UserProfileCard.module.scss";
import { Tabs, type Tab } from "@/components/common/Tabs";

export interface UserProfileCardProps {
  fullName: string;
  userId: string;
  userTier: number;
  accountBalance: number;
  accountNumber: string;
  bankName: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const TABS: Tab[] = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];

export const UserProfileCard = React.forwardRef<
  HTMLDivElement,
  UserProfileCardProps
>(
  (
    {
      fullName,
      userId,
      userTier,
      accountBalance,
      accountNumber,
      bankName,
      onTabChange,
      className = "",
    },
    ref,
  ) => {
    const [activeTab, setActiveTab] = useState("general");

    const handleTabChange = (tabId: string) => {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    };

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(amount);
    };

    const renderStars = (tier: number) => {
      return Array.from({ length: 3 }, (_, index) => {
        const isFilled = index < tier;
        return (
          <Star
            key={index}
            size={16}
            fill={isFilled ? "#E9B200" : "none"}
            stroke="#E9B200"
            strokeWidth={1.5}
          />
        );
      });
    };

    const cardClasses = [styles.card, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={cardClasses}>
        <div className={styles.content}>
          {/* User Info Section */}
          <div className={styles.userInfo}>
            <Avatar size="large" alt={fullName} />

            <div className={styles.userDetails}>
              <h2 className={styles.userName}>{fullName}</h2>
              <p className={styles.userId}>{userId}</p>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className={styles.separator} />

          {/* User Tier Section */}
          <div className={styles.tierSection}>
            <p className={styles.tierLabel}>User's Tier</p>
            <div className={styles.stars}>{renderStars(userTier)}</div>
          </div>

          {/* Vertical Separator */}
          <div className={styles.separator} />

          {/* Bank Details Section */}
          <div className={styles.bankSection}>
            <p className={styles.balance}>{formatCurrency(accountBalance)}</p>
            <p className={styles.bankDetails}>
              {accountNumber}/{bankName}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className={styles.tabs}
        />
      </div>
    );
  },
);

UserProfileCard.displayName = "UserProfileCard";

export default UserProfileCard;
