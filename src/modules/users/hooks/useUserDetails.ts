import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/modules/users/utils/types";
import { useRetrieveUser } from "@/hooks/useUserStorage";

interface UseUserDetailsOptions {
  userId?: string;
  redirectOnError?: boolean;
  redirectDelay?: number;
}

interface UseUserDetailsReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useUserDetails({
  userId,
  redirectOnError = true,
  redirectDelay = 2000,
}: UseUserDetailsOptions): UseUserDetailsReturn {
  const navigate = useNavigate();
  const { retrieveUser } = useRetrieveUser();

  // ✅ Initialize state based on userId presence
  const [state, setState] = useState<{
    user: User | null;
    loading: boolean;
    error: string | null;
  }>({
    user: null,
    loading: !!userId, // Only loading if userId exists
    error: userId ? null : "No user ID provided",
  });

  useEffect(() => {
    // Skip if no userId
    if (!userId) {
      return;
    }

    try {
      const storedUser = retrieveUser(userId);

      if (!storedUser) {
        setTimeout(() => {
          setState({
            user: null,
            loading: false,
            error: "User not found in storage",
          });
        }, 0);

        // Redirect after delay if enabled
        if (redirectOnError) {
          const timer = setTimeout(() => {
            navigate("/users", {
              replace: true,
              state: {
                error:
                  "User data not found. Please select a user from the table.",
              },
            });
          }, redirectDelay);

          return () => clearTimeout(timer);
        }

        return;
      }

      setTimeout(() => {
        setState({
          user: storedUser,
          loading: false,
          error: null,
        });
      }, 0);
    } catch (err) {
      console.error("Error retrieving user:", err);

      setTimeout(() => {
        setState({
          user: null,
          loading: false,
          error: "Failed to load user data",
        });
      }, 0);
    }
  }, [userId, retrieveUser, navigate, redirectOnError, redirectDelay]);

  return state;
}

export default useUserDetails;
