import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { User } from "@/modules/users/utils/types";
import {
  useRemoveUser,
  useRetrieveUser,
  useStoreUser,
} from "@/hooks/useUserStorage";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  const mock = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };

  // Make store keys enumerable for testing
  Object.defineProperty(mock, "keys", {
    get: () => Object.keys(store),
    enumerable: false,
  });

  return mock;
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockUser: User = {
  id: "test-123",
  createdAt: "2024-01-01",
  orgName: "Test Org",
  userName: "testuser",
  email: "test@example.com",
  phoneNumber: "1234567890",
  lastActiveDate: "2024-01-01",
  status: "Active",
  profile: {
    firstName: "Test",
    lastName: "User",
    phoneNumber: "1234567890",
    avatar: "",
    gender: "Male",
    bvn: "12345678901",
    address: "Test Address",
    currency: "NGN",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Owned",
  },
  guarantor: {
    firstName: "Guarantor",
    lastName: "Name",
    phoneNumber: "0987654321",
    gender: "Female",
    address: "Guarantor Address",
  },
  accountNumber: "1234567890",
  accountBalance: "100000",
  education: {
    level: "B.Sc",
    employmentStatus: "Employed",
    sector: "FinTech",
    duration: "2 years",
    officeEmail: "test@work.com",
    monthlyIncome: ["100000", "200000"],
    loanRepayment: "40000",
  },
  socials: {
    facebook: "test",
    instagram: "@test",
    twitter: "@test",
  },
};

describe("useUserStorage", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("useStoreUser - Positive Scenarios", () => {
    it("should store user successfully", () => {
      const { result } = renderHook(() => useStoreUser());

      act(() => {
        result.current.storeUser(mockUser);
      });

      const stored = localStorage.getItem("lendsqr_user_test-123");
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toEqual(mockUser);
    });

    it("should update current user ID when storing", () => {
      const { result } = renderHook(() => useStoreUser());

      act(() => {
        result.current.storeUser(mockUser);
      });

      const currentUserId = localStorage.getItem("lendsqr_current_user_id");
      expect(currentUserId).toBe("test-123");
    });

    it("should confirm user is stored", () => {
      const { result } = renderHook(() => useStoreUser());

      act(() => {
        result.current.storeUser(mockUser);
      });

      expect(result.current.isStored("test-123")).toBe(true);
    });
  });

  describe("useStoreUser - Negative Scenarios", () => {
    it("should return false for non-existent user", () => {
      const { result } = renderHook(() => useStoreUser());

      expect(result.current.isStored("non-existent-id")).toBe(false);
    });

    it("should handle storage errors gracefully", () => {
      const { result } = renderHook(() => useStoreUser());

      // Mock localStorage.setItem to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn(() => {
        throw new Error("Storage quota exceeded");
      });

      expect(() => {
        act(() => {
          result.current.storeUser(mockUser);
        });
      }).toThrow("Storage quota exceeded");

      // Restore
      localStorage.setItem = originalSetItem;
    });
  });

  describe("useRetrieveUser - Positive Scenarios", () => {
    it("should retrieve stored user successfully", () => {
      // Store user first
      const { result: storeResult } = renderHook(() => useStoreUser());
      act(() => {
        storeResult.current.storeUser(mockUser);
      });

      // Retrieve user
      const { result: retrieveResult } = renderHook(() => useRetrieveUser());
      const user = retrieveResult.current.retrieveUser("test-123");

      expect(user).toEqual(mockUser);
    });

    it("should get current user ID", () => {
      const { result: storeResult } = renderHook(() => useStoreUser());
      act(() => {
        storeResult.current.storeUser(mockUser);
      });

      const { result: retrieveResult } = renderHook(() => useRetrieveUser());
      const currentId = retrieveResult.current.getCurrentUserId();

      expect(currentId).toBe("test-123");
    });
  });

  describe("useRetrieveUser - Negative Scenarios", () => {
    it("should return null for non-existent user", () => {
      const { result } = renderHook(() => useRetrieveUser());
      const user = result.current.retrieveUser("non-existent-id");

      expect(user).toBeNull();
    });

    it("should return null for corrupted data", () => {
      // Store corrupted data
      localStorage.setItem("lendsqr_user_corrupted", "invalid-json{{{");

      const { result } = renderHook(() => useRetrieveUser());
      const user = result.current.retrieveUser("corrupted");

      expect(user).toBeNull();
    });

    it("should return null when current user ID does not exist", () => {
      const { result } = renderHook(() => useRetrieveUser());
      const currentId = result.current.getCurrentUserId();

      expect(currentId).toBeNull();
    });
  });

  describe("useRemoveUser - Positive Scenarios", () => {
    it("should remove user successfully", () => {
      // Store user first
      const { result: storeResult } = renderHook(() => useStoreUser());
      act(() => {
        storeResult.current.storeUser(mockUser);
      });

      // Remove user
      const { result: removeResult } = renderHook(() => useRemoveUser());
      act(() => {
        removeResult.current.removeUser("test-123");
      });

      const stored = localStorage.getItem("lendsqr_user_test-123");
      expect(stored).toBeNull();
    });

    it("should clear current user ID when removing current user", () => {
      const { result: storeResult } = renderHook(() => useStoreUser());
      act(() => {
        storeResult.current.storeUser(mockUser);
      });

      const { result: removeResult } = renderHook(() => useRemoveUser());
      act(() => {
        removeResult.current.removeUser("test-123");
      });

      const currentId = localStorage.getItem("lendsqr_current_user_id");
      expect(currentId).toBeNull();
    });

    it("should clear all users", () => {
      // Store multiple users
      const { result: storeResult } = renderHook(() => useStoreUser());
      act(() => {
        storeResult.current.storeUser(mockUser);
        storeResult.current.storeUser({ ...mockUser, id: "test-456" });
      });

      const { result: removeResult } = renderHook(() => useRemoveUser());
      act(() => {
        removeResult.current.clearAllUsers();
      });

      expect(localStorage.getItem("lendsqr_user_test-123")).toBeNull();
      expect(localStorage.getItem("lendsqr_user_test-456")).toBeNull();
      expect(localStorage.getItem("lendsqr_current_user_id")).toBeNull();
      expect(localStorage.getItem("lendsqr_user_list")).toBeNull();
    });
  });
});
