import React from "react";
import { AuthLayout } from "@/components/layout";
import { UserStats } from "../../components";
import { UsersTable } from "../../components/UsersTable";
import styles from "./Users.module.scss";
import { useUsersPageActions } from "../../hooks/useUsersPageActions";

const Users: React.FC = () => {
  const { handleViewDetails, handleBlacklistUser, handleActivateUser } =
    useUsersPageActions();

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
