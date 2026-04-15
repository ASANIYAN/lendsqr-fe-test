import React from "react";
import { Link } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import styles from "./Sidebar.module.scss";
import { useSidebarLogic } from "./useSidebarLogic";
import { sidebarMenuConfig } from "./sidebarMenuConfig";

// Import icons
import switchOrgIcon from "@/assets/switch-org.svg";
import dropdownIcon from "@/assets/switch-org-dropdown-icon.svg";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const {
    shouldShowCloseButton,
    isActiveRoute,
    getFirstItemIsActive,
    handleClose,
    handleBackdropClick,
    handleLogout,
  } = useSidebarLogic({ isOpen, setIsOpen });

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
          {sidebarMenuConfig.map((section, sectionIndex) => (
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
                      <Link to={item.path} className={styles.itemLink}>
                        <img
                          src={item.icon}
                          alt=""
                          className={styles.itemIcon}
                        />
                        <span className={styles.itemText}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Add spacing between sections */}
              {sectionIndex < sidebarMenuConfig.length - 1 && (
                <div className={styles.sectionGap} />
              )}
            </div>
          ))}
        </nav>

        <div className={styles.logoutSection}>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <LogOut
              size={16}
              className={styles.logoutIcon}
              aria-hidden="true"
            />
            <span className={styles.logoutText}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
