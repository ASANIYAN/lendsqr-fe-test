import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginSchema,
  type LoginFormType,
} from "@/modules/login/utils/validation";
import { toast } from "@/utils/toast";

type UseLoginFormReturn = {
  form: ReturnType<typeof useForm<LoginFormType>>;
  handleSubmit: (data: LoginFormType) => void;
  isLoading: boolean;
};

export const useLoginForm = (): UseLoginFormReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormType) => {
    setIsLoading(true);

    try {
      console.log("Login data:", data);

      // Simulate API call with 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast.success("Login successful!");

      // Navigate to users dashboard
      navigate("/users");

      // Here you would typically:
      // 1. Make API call to login endpoint
      // 2. Store authentication token
    } catch (error) {
      // Show error toast
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
  };
};
