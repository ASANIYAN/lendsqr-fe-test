import { useNavigate, useParams } from "react-router-dom";
import { UserDetailsHeader } from "../../components/UserDetailsHeader";
import { UserInfo } from "../../components/UserInfo";
import { AuthLayout } from "@/components/layout";
import useUserDetails from "../../hooks/useUserDetails";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";

export function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user, loading, error } = useUserDetails({
    userId: id,
    redirectOnError: true,
    redirectDelay: 2000,
  });

  const handleBack = () => {
    navigate("/users");
  };

  const handleBlacklist = () => {
    if (!user) return;
  };

  const handleActivate = () => {
    if (!user) return;
  };

  const handleTabChange = (tabId: string) => {
    console.log("Tab changed to:", tabId);
  };

  // Loading state
  if (loading) {
    return (
      <AuthLayout>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>Loading user details...</p>
        </div>
      </AuthLayout>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <AuthLayout>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h3>Error</h3>
          <p>{error || "User not found"}</p>
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Redirecting to users page...
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div>
        <UserDetailsHeader
          onBack={handleBack}
          onBlacklist={handleBlacklist}
          onActivate={handleActivate}
          user={user}
        />

        <UserProfileCard
          fullName={`${user.profile.firstName} ${user.profile.lastName}`}
          userId={user.id}
          userTier={1}
          accountBalance={parseFloat(user.accountBalance)}
          accountNumber={user.accountNumber}
          bankName="Providus Bank"
          onTabChange={handleTabChange}
        />

        <UserInfo user={user} />
      </div>
    </AuthLayout>
  );
}

export default UserDetails;
