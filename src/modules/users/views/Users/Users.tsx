import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout";
import { UserStats } from "../../components";
import { UsersTable } from "../../components/UsersTable";
import styles from "./Users.module.scss";

const Users: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleBlacklistUser = (userId: string) => {
    console.log("Blacklisting user:", userId);
  };

  const handleActivateUser = (userId: string) => {
    console.log("Activating user:", userId);
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
