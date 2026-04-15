import { useEffect, useState } from "react";

interface UseIsMobileOptions {
  breakpoint?: number;
}

export const useIsMobile = ({ breakpoint = 768 }: UseIsMobileOptions = {}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
