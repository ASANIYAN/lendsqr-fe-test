import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import type { User } from "@/modules/users/utils/types";
import { BrowserRouter } from "react-router-dom";
import useUserDetails from "@/modules/users/hooks/useUserDetails";
import { useRetrieveUser } from "@/hooks/useUserStorage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/hooks/useUserStorage", () => ({
  useRetrieveUser: vi.fn(),
}));

const mockUser: User = {
  id: "test-123",
  profile: {
    firstName: "Test",
    lastName: "User",
  },
} as User;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("useUserDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * POSITIVE SCENARIOS
   */
  it("should load user successfully", async () => {
    const mockUseRetrieveUser = vi.mocked(useRetrieveUser);
    mockUseRetrieveUser.mockReturnValue({
      retrieveUser: vi.fn().mockReturnValue(mockUser),
      getCurrentUserId: vi.fn(),
    });

    const { result } = renderHook(
      () => useUserDetails({ userId: "test-123" }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  /**
   * NEGATIVE SCENARIOS
   */
  it("should handle missing userId", () => {
    const mockUseRetrieveUser = vi.mocked(useRetrieveUser);
    mockUseRetrieveUser.mockReturnValue({
      retrieveUser: vi.fn(),
      getCurrentUserId: vi.fn(),
    });

    const { result } = renderHook(() => useUserDetails({ userId: undefined }), {
      wrapper,
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe("No user ID provided");
  });

  it("should handle user not found", async () => {
    const mockUseRetrieveUser = vi.mocked(useRetrieveUser);
    const mockRetrieveUser = vi.fn().mockReturnValue(null);
    mockUseRetrieveUser.mockReturnValue({
      retrieveUser: mockRetrieveUser,
      getCurrentUserId: vi.fn(),
    });

    const { result } = renderHook(
      () => useUserDetails({ userId: "non-existent", redirectOnError: true }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.error).toBe("User not found in storage");
    });

    expect(result.current.user).toBeNull();
  });

  it("should redirect after delay when user not found", async () => {
    const mockUseRetrieveUser = vi.mocked(useRetrieveUser);
    const mockRetrieveUser = vi.fn().mockReturnValue(null);
    mockUseRetrieveUser.mockReturnValue({
      retrieveUser: mockRetrieveUser,
      getCurrentUserId: vi.fn(),
    });

    renderHook(
      () =>
        useUserDetails({
          userId: "non-existent",
          redirectOnError: true,
          redirectDelay: 100,
        }),
      { wrapper },
    );

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith("/users", expect.any(Object));
      },
      { timeout: 200 },
    );
  });
});
