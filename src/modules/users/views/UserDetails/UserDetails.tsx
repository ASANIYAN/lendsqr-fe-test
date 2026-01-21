import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserDetails.module.scss";
import { UserDetailsHeader } from "../../components/UserDetailsHeader";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";

export function UserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();

  // TODO: Fetch user data based on userId
  const userData = {
    fullName: "Grace Effiom",
    userId: "LSQFf587g90",
    userTier: 1,
    accountBalance: 200000.0,
    accountNumber: "9912345678",
    bankName: "Providus Bank",
  };

  const handleBack = () => {
    navigate("/users");
  };

  const handleBlacklist = () => {
    console.log("Blacklist user:", userId);
    // TODO: Implement blacklist logic
  };

  const handleActivate = () => {
    console.log("Activate user:", userId);
    // TODO: Implement activate logic
  };

  const handleTabChange = (tabId: string) => {
    console.log("Tab changed to:", tabId);
    // TODO: Handle tab content display
  };

  return (
    <div className={styles.userDetails}>
      <UserDetailsHeader
        onBack={handleBack}
        onBlacklist={handleBlacklist}
        onActivate={handleActivate}
      />

      <UserProfileCard
        fullName={userData.fullName}
        userId={userData.userId}
        userTier={userData.userTier}
        accountBalance={userData.accountBalance}
        accountNumber={userData.accountNumber}
        bankName={userData.bankName}
        onTabChange={handleTabChange}
      />

      {/* Tab content will go here */}
    </div>
  );
}

export default UserDetails;
