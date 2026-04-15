import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface UseUsersPageActionsReturn {
  handleViewDetails: (userId: string) => void;
  handleBlacklistUser: (userId: string) => void;
  handleActivateUser: (userId: string) => void;
}

export const useUsersPageActions = (): UseUsersPageActionsReturn => {
  const navigate = useNavigate();

  const handleViewDetails = useCallback(
    (userId: string) => {
      navigate(`/users/${userId}`);
    },
    [navigate],
  );

  const handleBlacklistUser = useCallback((userId: string) => {
    console.log("Blacklisting user:", userId);
  }, []);

  const handleActivateUser = useCallback((userId: string) => {
    console.log("Activating user:", userId);
  }, []);

  return {
    handleViewDetails,
    handleBlacklistUser,
    handleActivateUser,
  };
};
