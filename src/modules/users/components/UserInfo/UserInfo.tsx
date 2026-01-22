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

import type { User } from "@/modules/users/utils/types";

const UserInfo: React.FC<{ user?: User }> = ({ user }) => {
  // If a stored user is available, derive sections from it
  const sections = user
    ? [
        {
          title: "Personal Information",
          items: [
            {
              label: "Full Name",
              value: `${user.profile.firstName} ${user.profile.lastName}`,
            },
            { label: "Phone Number", value: user.profile.phoneNumber },
            { label: "Email Address", value: user.email },
            { label: "BVN", value: user.profile.bvn },
            { label: "Gender", value: user.profile.gender },
            { label: "Marital Status", value: user.profile.maritalStatus },
            { label: "Children", value: user.profile.children },
            { label: "Type of Residence", value: user.profile.typeOfResidence },
          ],
        },
        {
          title: "Education and Employment",
          items: [
            { label: "Level of Education", value: user.education.level },
            {
              label: "Employment Status",
              value: user.education.employmentStatus,
            },
            { label: "Sector of Employment", value: user.education.sector },
            { label: "Duration of Employment", value: user.education.duration },
            { label: "Office Email", value: user.education.officeEmail },
            {
              label: "Monthly Income",
              value: Array.isArray(user.education.monthlyIncome)
                ? `${user.education.monthlyIncome[0]} - ${user.education.monthlyIncome[1]}`
                : user.education.monthlyIncome,
            },
            { label: "Loan Repayment", value: user.education.loanRepayment },
          ],
        },
        {
          title: "Socials",
          items: [
            { label: "Twitter", value: user.socials.twitter },
            { label: "Facebook", value: user.socials.facebook },
            { label: "Instagram", value: user.socials.instagram },
          ],
        },
        {
          title: "Guarantor",
          items: [
            {
              label: "Full Name",
              value: `${user.guarantor.firstName} ${user.guarantor.lastName}`,
            },
            { label: "Phone Number", value: user.guarantor.phoneNumber },
            { label: "Address", value: user.guarantor.address || "N/A" },
            { label: "Gender", value: user.guarantor.gender || "N/A" },
          ],
          showDivider: false,
        },
      ]
    : [
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
