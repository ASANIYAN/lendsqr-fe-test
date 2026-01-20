import React from "react";
import { AuthLayout } from "@/components/layout";
import { UserStats } from "@/modules/users";

const Users: React.FC = () => {
  return (
    <AuthLayout>
      <UserStats />
    </AuthLayout>
  );
};

export default Users;
