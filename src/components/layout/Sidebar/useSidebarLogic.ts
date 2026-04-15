import { useCallback, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStorage } from "@/hooks/useUserStorage";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { MenuItem } from "./sidebar.types";

interface UseSidebarLogicParams {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface UseSidebarLogicReturn {
  isMobile: boolean;
  shouldShowCloseButton: boolean;
  isActiveRoute: (path: string) => boolean;
  getFirstItemIsActive: (items: MenuItem[]) => boolean;
  handleClose: () => void;
  handleBackdropClick: (e: MouseEvent) => void;
  handleLogout: () => void;
}

export const useSidebarLogic = ({
  isOpen,
  setIsOpen,
}: UseSidebarLogicParams): UseSidebarLogicReturn => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCurrentUser } = useUserStorage();
  const isMobile = useIsMobile({ breakpoint: 1025 });

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  const isActiveRoute = useCallback(
    (path: string) => {
      return (
        location.pathname === path || location.pathname.startsWith(path + "/")
      );
    },
    [location.pathname],
  );

  const getFirstItemIsActive = useCallback(
    (items: MenuItem[]) => {
      return items.length > 0 && isActiveRoute(items[0].path);
    },
    [isActiveRoute],
  );

  const handleLogout = useCallback(() => {
    clearCurrentUser();
    navigate("/login");

    if (isMobile) {
      handleClose();
    }
  }, [clearCurrentUser, navigate, isMobile, handleClose]);

  return {
    isMobile,
    shouldShowCloseButton: isOpen && isMobile,
    isActiveRoute,
    getFirstItemIsActive,
    handleClose,
    handleBackdropClick,
    handleLogout,
  };
};
