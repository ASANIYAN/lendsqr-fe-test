import React from "react";
import { Card } from "@/components/common";
import usersIcon from "@/assets/users-card-icon.svg";
import activeUsersIcon from "@/assets/active-users-icon.svg";
import usersWithLoansIcon from "@/assets/users-with-loans-icon.svg";
import usersWithSavingsIcon from "@/assets/users-with-savings-icon.svg";
import styles from "./UserStats.module.scss";

const UserStats: React.FC = () => {
  const statsData = [
    {
      icon: usersIcon,
      heading: "Users",
      value: 2453,
    },
    {
      icon: activeUsersIcon,
      heading: "Active Users",
      value: 2453,
    },
    {
      icon: usersWithLoansIcon,
      heading: "Users with Loans",
      value: 12453,
    },
    {
      icon: usersWithSavingsIcon,
      heading: "Users with Savings",
      value: 102453,
    },
  ];

  return (
    <div>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.cardsGrid}>
        {statsData.map((stat, index) => (
          <Card
            key={index}
            icon={stat.icon}
            heading={stat.heading}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
};

export default UserStats;
