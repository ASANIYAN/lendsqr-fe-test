import { useState } from "react";

export interface UseAuthLayoutReturn {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const useAuthLayout = (): UseAuthLayoutReturn => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
  };
};

export default useAuthLayout;
