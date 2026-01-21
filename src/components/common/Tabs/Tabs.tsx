import React from "react";
import styles from "./Tabs.module.scss";

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, activeTab, onTabChange, className = "" }, ref) => {
    const tabsClasses = [styles.tabs, className].filter(Boolean).join(" ");

    return (
      <section className={styles.tabs_container}>
        <div ref={ref} className={tabsClasses}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const tabClasses = [styles.tab, isActive && styles.active]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={tabClasses}
                aria-selected={isActive}
                role="tab"
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>
    );
  },
);

Tabs.displayName = "Tabs";

export default Tabs;
