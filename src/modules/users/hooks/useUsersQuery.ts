import { useQuery } from "@tanstack/react-query";
import type { User, ApiError } from "../utils/types";

const USERS_API_ENDPOINT = "https://lendsqr-fe-test.free.beeceptor.com/users";

interface UseUsersQueryOptions {
  enabled?: boolean;
  staleTime?: number;
}

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(USERS_API_ENDPOINT);

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    const data: User[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching users");
  }
};

export const useUsersQuery = (options: UseUsersQueryOptions = {}) => {
  const { enabled = true, staleTime = 5 * 60 * 60 * 1000 } = options; // 5 hours default

  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime,
    enabled,
    retry: (failureCount, error) => {
      // Don't retry for certain error types
      if (
        error.message.includes("Account limit reached") ||
        error.message.includes("No mock rule found")
      ) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    users: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
