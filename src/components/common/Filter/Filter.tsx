import React from "react";
import { Calendar, X } from "lucide-react";
import { BaseInput } from "../Input/BaseInput";
import { BaseSelect, type SelectOption } from "../Select/BaseSelect";
import { Button } from "../Button/Button";
import styles from "./Filter.module.scss";

export interface FilterFormData {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: string;
}

export interface FilterProps {
  onFilter: (data: FilterFormData) => void;
  onReset: () => void;
  onClose?: () => void;
  className?: string;
}

export const Filter: React.FC<FilterProps> = ({
  onFilter,
  onReset,
  onClose,
  className = "",
}) => {
  const filterRef = React.useRef<HTMLDivElement>(null);
  const [formData, setFormData] = React.useState<FilterFormData>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  // Check if screen is mobile/tablet (less than 1024px)
  const [showCloseButton, setShowCloseButton] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setShowCloseButton(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle click outside on desktop
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        window.innerWidth >= 1024 && // Only on desktop
        onClose
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Options for select fields
  const organizationOptions: SelectOption[] = [
    { label: "Lendsqr", value: "lendsqr" },
    { label: "Irorun", value: "irorun" },
    { label: "Lendstar", value: "lendstar" },
  ];

  const statusOptions: SelectOption[] = [
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" },
    { label: "Blacklisted", value: "blacklisted" },
    { label: "Active", value: "active" },
  ];

  const handleInputChange = (field: keyof FilterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(formData);
    onClose?.();
  };

  const handleReset = () => {
    setFormData({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    onReset();
    onClose?.();
  };

  const filterClasses = [styles.filter, className].filter(Boolean).join(" ");

  return (
    <div ref={filterRef} className={filterClasses}>
      {/* Close button for mobile/tablet screens */}
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close filter"
        >
          <X size={16} />
        </button>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="organization" className={styles.label}>
            Organization
          </label>
          <BaseSelect
            id="organization"
            variant="secondary"
            placeholder="Select"
            options={organizationOptions}
            value={formData.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <BaseInput
            id="username"
            placeholder="User"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <BaseInput
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="date" className={styles.label}>
            Date
          </label>
          <BaseInput
            id="date"
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            rightIcon={<Calendar size={16} />}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number
          </label>
          <BaseInput
            id="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="status" className={styles.label}>
            Status
          </label>
          <BaseSelect
            id="status"
            variant="secondary"
            placeholder="Select"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="primary"
            color="primary"
            className={styles.filterButton}
          >
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
};

Filter.displayName = "Filter";

export default Filter;
