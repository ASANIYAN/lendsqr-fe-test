// User Profile Types
export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  gender: "Male" | "Female";
  bvn: string;
  address: string;
  currency: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  children: string;
  typeOfResidence: "Owned" | "Rented" | "Family" | "Other";
}

// User Guarantor Types
export interface UserGuarantor {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: "Male" | "Female";
  address: string;
}

// User Education Types
export interface UserEducation {
  level: string;
  employmentStatus: "Employed" | "Unemployed" | "Self-employed";
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: [string, string]; // Range [min, max]
  loanRepayment: string;
}

// User Social Types
export interface UserSocials {
  facebook: string;
  instagram: string;
  twitter: string;
}

// Main User Type
export interface User {
  id: string;
  createdAt: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  lastActiveDate: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  profile: UserProfile;
  guarantor: UserGuarantor;
  accountNumber: string;
  accountBalance: string;
  education: UserEducation;
  socials: UserSocials;
}

// API Response Types
export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  status: string;
  message: string;
}

// Table/Filter Types
export interface UserTableFilters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: User["status"];
}

// Utility Types
export type UserStatus = User["status"];
export type UserOrganization = "Lendsqr" | "Irorun" | "Lendstar";
