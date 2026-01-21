import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DataTable, Filter } from "@/components/common";
import type { FilterFormData } from "@/components/common/Filter/Filter";
import { useDataTable } from "@/hooks/useDataTable";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { createUserTableColumns } from "./UserTableColumns";
import type { User, UserTableFilters } from "../utils/types";
import styles from "./UsersTable.module.scss";

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
  const { users, isLoading, isError, error } = useUsersQuery();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserTableFilters>({});
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile/tablet (less than 1024px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Filter users based on applied filters
  const filteredUsers = useMemo(() => {
    if (!users.length) return [];

    return users.filter((user) => {
      if (
        filters.organization &&
        !user.orgName.toLowerCase().includes(filters.organization.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.username &&
        !user.userName.toLowerCase().includes(filters.username.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.email &&
        !user.email.toLowerCase().includes(filters.email.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.phoneNumber &&
        !user.phoneNumber.includes(filters.phoneNumber)
      ) {
        return false;
      }
      if (
        filters.status &&
        user.status.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }
      if (filters.date) {
        const userDate = new Date(user.createdAt).toISOString().split("T")[0];
        if (userDate !== filters.date) {
          return false;
        }
      }
      return true;
    });
  }, [users, filters]);

  const handleFilterClick = useCallback(
    (column: string) => {
      setShowFilter(showFilter === column ? null : column);
      setActiveDropdown(null);
    },
    [showFilter],
  );

  const handleFilter = (filterData: FilterFormData) => {
    setFilters({
      organization: filterData.organization,
      username: filterData.username,
      email: filterData.email,
      date: filterData.date,
      phoneNumber: filterData.phoneNumber,
      status: filterData.status as User["status"],
    });
    setShowFilter(null);
  };

  const handleResetFilter = () => {
    setFilters({});
    setShowFilter(null);
  };

  const handleRowClick = (user: User) => {
    onViewDetails(user.id);
  };

  const columns = useMemo(
    () =>
      createUserTableColumns({
        onViewDetails,
        onBlacklistUser,
        onActivateUser,
        onFilterClick: handleFilterClick,
        activeDropdown,
        setActiveDropdown,
      }),
    [
      onViewDetails,
      onBlacklistUser,
      onActivateUser,
      activeDropdown,
      handleFilterClick,
    ],
  );

  const { table } = useDataTable({
    data: filteredUsers,
    columns,
    pageSize: 10,
    initialState: {
      columnPinning: { right: ["actions"] },

      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
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
      {/* Filter with conditional overlay */}
      {showFilter && (
        <>
          {/* Show overlay only on mobile/tablet */}
          {isMobile && (
            <div
              className={styles.filterOverlay}
              onClick={() => setShowFilter(null)}
            />
          )}
          <div className={styles.filterContainer}>
            <Filter
              onFilter={handleFilter}
              onReset={handleResetFilter}
              onClose={() => setShowFilter(null)}
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
