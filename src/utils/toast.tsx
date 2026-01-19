import { CheckCircle, XCircle } from "lucide-react";
import { toast as sonnerToast, type ExternalToast } from "sonner";

export const toast = {
  success: (message: string, options?: ExternalToast) => {
    return sonnerToast.success(message, {
      ...options,
      icon: <CheckCircle size={20} />,
    });
  },

  error: (message: string, options?: ExternalToast) => {
    return sonnerToast.error(message, {
      ...options,
      icon: <XCircle size={20} />,
    });
  },

  info: sonnerToast.info,
  warning: sonnerToast.warning,
  loading: sonnerToast.loading,
  custom: sonnerToast.custom,
  message: sonnerToast.message,
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
};
