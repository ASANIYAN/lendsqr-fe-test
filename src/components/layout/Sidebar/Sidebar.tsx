import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import styles from "./Sidebar.module.scss";

// Import icons
import switchOrgIcon from "@/assets/switch-org.svg";
import dropdownIcon from "@/assets/switch-org-dropdown-icon.svg";
import dashboardIcon from "@/assets/dashboard.svg";
import usersIcon from "@/assets/users.svg";
import guarantorsIcon from "@/assets/guarantors.svg";
import loansIcon from "@/assets/loans.svg";
import decisionModelsIcon from "@/assets/decision-models.svg";
import savingsIcon from "@/assets/savings.svg";
import loanRequestsIcon from "@/assets/loan-requests.svg";
import whitelistIcon from "@/assets/whitelist.svg";
import karmaIcon from "@/assets/karma.svg";
import organisationIcon from "@/assets/organisation.svg";
import loanProductIcon from "@/assets/loan-product.svg";
import savingsProductIcon from "@/assets/savings-product.svg";
import feesAndChargesIcon from "@/assets/fees-and-charges.svg";
import transactionsIcon from "@/assets/transactions.svg";
import servicesIcon from "@/assets/services.svg";
import serviceAccountIcon from "@/assets/service-acount.svg";
import settlementsIcon from "@/assets/settlements.svg";
import reportsIcon from "@/assets/reports.svg";
import preferencesIcon from "@/assets/preferences.svg";
import feesAndPricingIcon from "@/assets/fees-and-pricing.svg";
import auditLogsIcon from "@/assets/audit-logs.svg";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Static menu configuration
const menuConfig: MenuSection[] = [
  {
    id: "main",
    label: "",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: dashboardIcon,
        path: "#",
      },
    ],
  },
  {
    id: "customers",
    label: "CUSTOMERS",
    items: [
      {
        id: "users",
        label: "Users",
        icon: usersIcon,
        path: "/users",
      },
      {
        id: "guarantors",
        label: "Guarantors",
        icon: guarantorsIcon,
        path: "#",
      },
      {
        id: "loans",
        label: "Loans",
        icon: loansIcon,
        path: "#",
      },
      {
        id: "decision-models",
        label: "Decision Models",
        icon: decisionModelsIcon,
        path: "#",
      },
      {
        id: "savings",
        label: "Savings",
        icon: savingsIcon,
        path: "#",
      },
      {
        id: "loan-requests",
        label: "Loan Requests",
        icon: loanRequestsIcon,
        path: "#",
      },
      {
        id: "whitelist",
        label: "Whitelist",
        icon: whitelistIcon,
        path: "#",
      },
      {
        id: "karma",
        label: "Karma",
        icon: karmaIcon,
        path: "#",
      },
    ],
  },
  {
    id: "businesses",
    label: "BUSINESSES",
    items: [
      {
        id: "organization",
        label: "Organization",
        icon: organisationIcon,
        path: "#",
      },
      {
        id: "loan-products",
        label: "Loan Products",
        icon: loanProductIcon,
        path: "#",
      },
      {
        id: "savings-products",
        label: "Savings Products",
        icon: savingsProductIcon,
        path: "#",
      },
      {
        id: "fees-and-charges",
        label: "Fees and Charges",
        icon: feesAndChargesIcon,
        path: "#",
      },
      {
        id: "transactions",
        label: "Transactions",
        icon: transactionsIcon,
        path: "#",
      },
      {
        id: "services",
        label: "Services",
        icon: servicesIcon,
        path: "#",
      },
      {
        id: "service-account",
        label: "Service Account",
        icon: serviceAccountIcon,
        path: "#",
      },
      {
        id: "settlements",
        label: "Settlements",
        icon: settlementsIcon,
        path: "#",
      },
      {
        id: "reports",
        label: "Reports",
        icon: reportsIcon,
        path: "#",
      },
    ],
  },
  {
    id: "settings",
    label: "SETTINGS",
    items: [
      {
        id: "preferences",
        label: "Preferences",
        icon: preferencesIcon,
        path: "#",
      },
      {
        id: "fees-and-pricing",
        label: "Fees and Pricing",
        icon: feesAndPricingIcon,
        path: "#",
      },
      {
        id: "audit-logs",
        label: "Audit Logs",
        icon: auditLogsIcon,
        path: "#",
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Track window size to determine if we should show the close button
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Check initial size
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const isActiveRoute = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const getFirstItemIsActive = (items: MenuItem[]) => {
    return items.length > 0 && isActiveRoute(items[0].path);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Check if we should show the close button (only on mobile/tablet when sidebar is open)
  const shouldShowCloseButton = isOpen && isMobile;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        {/* Mobile close button - only show on smaller screens when sidebar is open */}
        {shouldShowCloseButton && (
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        )}

        {/* Switch Organization */}
        <div className={styles.switchOrg}>
          <img
            src={switchOrgIcon}
            alt="briefcase-icon"
            className={styles.switchOrgIcon}
          />
          <span className={styles.switchOrgText}>Switch Organization</span>
          <img
            width={14}
            height={14}
            src={dropdownIcon}
            alt="dropdown-icon"
            className={styles.switchOrgdropdownIcon}
          />
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {menuConfig.map((section, sectionIndex) => (
            <div key={section.id} className={styles.section}>
              {/* Section label */}
              {section.label && (
                <h3
                  className={`${styles.sectionLabel} ${
                    getFirstItemIsActive(section.items)
                      ? styles.sectionLabelActiveFirst
                      : styles.sectionLabelInactiveFirst
                  }`}
                >
                  {section.label}
                </h3>
              )}

              {/* Section items */}
              <ul className={styles.itemsList}>
                {section.items.map((item, itemIndex) => {
                  const isActive = isActiveRoute(item.path);
                  const prevItem = section.items[itemIndex - 1];
                  const isPrevActive = prevItem
                    ? isActiveRoute(prevItem.path)
                    : false;

                  return (
                    <li
                      key={item.id}
                      className={`${styles.item} ${
                        isActive ? styles.itemActive : styles.itemInactive
                      } ${
                        itemIndex > 0
                          ? isPrevActive
                            ? styles.itemAfterActive
                            : styles.itemAfterInactive
                          : ""
                      }`}
                    >
                      <a href={item.path} className={styles.itemLink}>
                        <img
                          src={item.icon}
                          alt=""
                          className={styles.itemIcon}
                        />
                        <span className={styles.itemText}>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Add spacing between sections */}
              {sectionIndex < menuConfig.length - 1 && (
                <div className={styles.sectionGap} />
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
