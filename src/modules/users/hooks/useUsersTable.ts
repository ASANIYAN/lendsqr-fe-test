import { useCallback, useMemo, useState } from "react";
import type { FilterFormData } from "@/components/common/Filter/Filter";
import { useDataTable } from "@/hooks/useDataTable";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useStoreUser } from "@/hooks/useUserStorage";
import { createUserTableColumns } from "../components/UserTableColumns";
import { useUsersQuery } from "./useUsersQuery";
import type { User, UserTableFilters } from "../utils/types";

interface UseUsersTableParams {
  onViewDetails: (id: string) => void;
  onBlacklistUser: (id: string) => void;
  onActivateUser: (id: string) => void;
}

export interface UseUsersTableReturn {
  table: ReturnType<typeof useDataTable<User>>["table"];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isMobile: boolean;
  showFilter: string | null;
  closeFilter: () => void;
  handleFilter: (filterData: FilterFormData) => void;
  handleResetFilter: () => void;
  handleRowClick: (user: User) => void;
}

const filterUsers = (users: User[], filters: UserTableFilters): User[] => {
  if (!users.length) {
    return [];
  }

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

    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) {
      return false;
    }

    if (filters.status && user.status.toLowerCase() !== filters.status.toLowerCase()) {
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
};

export const useUsersTable = ({
  onViewDetails,
  onBlacklistUser,
  onActivateUser,
}: UseUsersTableParams): UseUsersTableReturn => {
  const { users, isLoading, isError, error } = useUsersQuery();
  const { storeUser } = useStoreUser();
  const isMobile = useIsMobile({ breakpoint: 1024 });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserTableFilters>({});

  const filteredUsers = useMemo(() => filterUsers(users, filters), [users, filters]);

  const handleFilterClick = useCallback(
    (column: string) => {
      setShowFilter(showFilter === column ? null : column);
      setActiveDropdown(null);
    },
    [showFilter],
  );

  const handleFilter = useCallback((filterData: FilterFormData) => {
    setFilters({
      organization: filterData.organization,
      username: filterData.username,
      email: filterData.email,
      date: filterData.date,
      phoneNumber: filterData.phoneNumber,
      status: filterData.status as User["status"],
    });

    setShowFilter(null);
  }, []);

  const handleResetFilter = useCallback(() => {
    setFilters({});
    setShowFilter(null);
  }, []);

  const closeFilter = useCallback(() => {
    setShowFilter(null);
  }, []);

  const handleRowClick = useCallback(
    (user: User) => {
      try {
        storeUser(user);
      } catch (storageError) {
        console.error("Failed to store user:", storageError);
      }
    },
    [storeUser],
  );

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

  return {
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
  };
};
