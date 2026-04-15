import React from "react";
import { DataTable, Filter } from "@/components/common";
import styles from "./UsersTable.module.scss";
import { useUsersTable } from "../hooks/useUsersTable";

interface UsersTableProps {
  onViewDetails: (id: string) => void;
  onBlacklistUser: (id: string) => void;
  onActivateUser: (id: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  onViewDetails,
  onBlacklistUser,
  onActivateUser,
}) => {
  const {
    table,
    isLoading,
    isError,
    error,
    isMobile,
    showFilter,
    closeFilter,
    handleFilter,
    handleResetFilter,
    handleRowClick,
  } = useUsersTable({
    onViewDetails,
    onBlacklistUser,
    onActivateUser,
  });

  if (isError) {
    return (
      <div className={styles.errorState}>
        <h3>Error Loading Users</h3>
        <p>{error?.message || "An unexpected error occurred"}</p>
      </div>
    );
  }

  return (
    <div className={styles.usersTable}>
      {showFilter && (
        <>
          {isMobile && <div className={styles.filterOverlay} onClick={closeFilter} />}
          <div className={styles.filterContainer}>
            <Filter
              onFilter={handleFilter}
              onReset={handleResetFilter}
              onClose={closeFilter}
            />
          </div>
        </>
      )}

      <DataTable
        table={table}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        pageSizeOptions={[10, 25, 50, 100]}
        className={styles.table}
      />
    </div>
  );
};

export default UsersTable;
