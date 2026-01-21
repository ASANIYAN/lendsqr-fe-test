import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout";
import { UserStats } from "../../components";
import { UsersTable } from "../../components/UsersTable";
import styles from "./Users.module.scss";

const Users: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = (userId: string) => {
    // Navigate to user details page
    navigate(`/users/${userId}`);
  };

  const handleBlacklistUser = (userId: string) => {
    // Handle blacklist user action
    console.log("Blacklisting user:", userId);
    // You can implement the actual blacklist logic here
  };

  const handleActivateUser = (userId: string) => {
    // Handle activate user action
    console.log("Activating user:", userId);
    // You can implement the actual activation logic here
  };

  return (
    <AuthLayout>
      <div className={styles.usersPage}>
        <UserStats />

        <div className={styles.tableSection}>
          <UsersTable
            onViewDetails={handleViewDetails}
            onBlacklistUser={handleBlacklistUser}
            onActivateUser={handleActivateUser}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Users;
