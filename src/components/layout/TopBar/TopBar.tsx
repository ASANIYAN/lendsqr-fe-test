import React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { SearchInput } from "../../common/Input/SearchInput";
import styles from "./TopBar.module.scss";
import lendsqrLogo from "../../../assets/lendsqr-logo.png";
import dummyAvatar from "../../../assets/dummy-avatar.svg";

interface TopBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <img src={lendsqrLogo} alt="Lendsqr" className={styles.logo} />
        </div>

        {/* Desktop Content */}
        <div className={styles.desktopContent}>
          {/* Search Input */}
          <div className={styles.searchSection}>
            <SearchInput placeholder="Search for anything" />
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <a href="#" className={styles.docsLink}>
              Docs
            </a>
            <button
              className={styles.notificationBtn}
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            <div className={styles.userSection}>
              <img
                src={dummyAvatar}
                alt="User Avatar"
                className={styles.avatar}
              />
              <span className={styles.userName}>Adedeji</span>
              <button className={styles.dropdownBtn} aria-label="User menu">
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
