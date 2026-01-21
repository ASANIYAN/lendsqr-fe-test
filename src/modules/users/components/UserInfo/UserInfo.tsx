import React from "react";
import styles from "./UserInfo.module.scss";

interface InfoItem {
  label: string;
  value: string | number;
}

interface SectionProps {
  title: string;
  items: InfoItem[];
  showDivider?: boolean;
}

const UserInfoSection: React.FC<SectionProps> = ({
  title,
  items,
  showDivider = true,
}) => (
  <>
    <div className={styles.section}>
      <h3 className={styles.heading}>{title}</h3>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={index} className={styles.infoGroup}>
            <span>{item.label}</span>
            <span>{item.value || "N/A"}</span>
          </div>
        ))}
      </div>
    </div>
    {showDivider && <hr className={styles.divider} />}
  </>
);

const UserInfo: React.FC = () => {
  // In a real app, these would come from props or a hook
  const sections = [
    {
      title: "Personal Information",
      items: [
        { label: "Full Name", value: "Grace Effiom" },
        { label: "Phone Number", value: "07060780922" },
        { label: "Email Address", value: "grace@gmail.com" },
        { label: "BVN", value: "07060780922" },
        { label: "Gender", value: "Female" },
        { label: "Marital Status", value: "Single" },
        { label: "Children", value: "None" },
        { label: "Type of Residence", value: "Parent's Apartment" },
      ],
    },
    {
      title: "Education and Employment",
      items: [
        { label: "Level of Education", value: "B.Sc" },
        { label: "Employment Status", value: "Employed" },
        { label: "Sector of Employment", value: "FinTech" },
        { label: "Duration of Employment", value: "2 years" },
        { label: "Office Email", value: "grace@lendsqr.com" },
        { label: "Monthly Income", value: "₦200,000.00 - ₦400,000.00" },
        { label: "Loan Repayment", value: "40,000" },
      ],
    },
    {
      title: "Socials",
      items: [
        { label: "Twitter", value: "@grace_effiom" },
        { label: "Facebook", value: "Grace Effiom" },
        { label: "Instagram", value: "@grace_effiom" },
      ],
    },
    {
      title: "Guarantor",
      items: [
        { label: "Full Name", value: "Debby Ogana" },
        { label: "Phone Number", value: "07060780922" },
        { label: "Email Address", value: "debby@gmail.com" },
        { label: "Relationship", value: "Sister" },
      ],
      showDivider: false,
    },
  ];

  return (
    <div className={styles.infoContainer}>
      {sections.map((section, idx) => (
        <UserInfoSection
          key={idx}
          title={section.title}
          items={section.items}
          showDivider={section.showDivider}
        />
      ))}
    </div>
  );
};

export default UserInfo;
