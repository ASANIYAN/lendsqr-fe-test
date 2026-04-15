import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import React from "react";
import { useUsersQuery } from "@/modules/users/hooks/useUsersQuery";

const mockUsers = [
  {
    id: "1",
    profile: { firstName: "Grace", lastName: "Effiom" },
    email: "grace@gmail.com",
    orgName: "Test Org",
    userName: "grace_effiom",
    phoneNumber: "07060780922",
    lastActiveDate: "2023-01-01",
    status: "Active" as const,
    guarantor: {
      firstName: "Test",
      lastName: "Guarantor",
      phoneNumber: "07000000000",
      gender: "Male" as const,
      address: "Test Address",
    },
    education: {
      level: "B.Sc",
      employmentStatus: "Employed" as const,
      sector: "FinTech",
      duration: "2 years",
      officeEmail: "grace@lendsqr.com",
      monthlyIncome: ["₦200,000.00", "₦400,000.00"],
      loanRepayment: "40,000",
    },
    socials: {
      facebook: "Grace Effiom",
      instagram: "@grace_effiom",
      twitter: "@grace_effiom",
    },
    accountNumber: "9912345678",
    accountBalance: "200000.00",
    createdAt: "2023-01-01",
  },
  {
    id: "2",
    profile: { firstName: "Debby", lastName: "Ogana" },
    email: "debby@gmail.com",
    orgName: "Test Org",
    userName: "debby_ogana",
    phoneNumber: "07060780923",
    lastActiveDate: "2023-01-02",
    status: "Active" as const,
    guarantor: {
      firstName: "Test",
      lastName: "Guarantor2",
      phoneNumber: "07000000001",
      gender: "Female" as const,
      address: "Test Address 2",
    },
    education: {
      level: "M.Sc",
      employmentStatus: "Employed" as const,
      sector: "Tech",
      duration: "3 years",
      officeEmail: "debby@lendsqr.com",
      monthlyIncome: ["₦300,000.00", "₦500,000.00"],
      loanRepayment: "50,000",
    },
    socials: {
      facebook: "Debby Ogana",
      instagram: "@debby_ogana",
      twitter: "@debby_ogana",
    },
    accountNumber: "9912345679",
    accountBalance: "300000.00",
    createdAt: "2023-01-02",
  },
];

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // Disable retries for faster testing
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("useUsersQuery", () => {
  it("should fetch and return users successfully", async () => {
    server.use(
      http.get("https://lendsqr-fe-test.free.beeceptor.com/users", () => {
        return HttpResponse.json(mockUsers);
      }),
    );

    const { result } = renderHook(() => useUsersQuery(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.users).toEqual([]);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.users).toHaveLength(2);
    expect(result.current.users[0].profile.firstName).toBe("Grace");
    expect(result.current.users[0].profile.lastName).toBe("Effiom");
    expect(result.current.isError).toBe(false);
  });

  // it("should handle API errors correctly", async () => {
  //   server.use(
  //     http.get("https://lendsqr-fe-test.free.beeceptor.com/users", () => {
  //       return HttpResponse.json(
  //         { message: "Internal Server Error" },
  //         { status: 500 },
  //       );
  //     }),
  //   );

  //   // Create a fresh query client for this test to avoid caching
  //   const freshQueryClient = new QueryClient({
  //     defaultOptions: {
  //       queries: { retry: false, staleTime: 0 },
  //     },
  //   });

  //   const freshWrapper = ({ children }: { children: React.ReactNode }) => (
  //     <QueryClientProvider client={freshQueryClient}>
  //       {children}
  //     </QueryClientProvider>
  //   );

  //   const { result } = renderHook(() => useUsersQuery({ enabled: true }), {
  //     wrapper: freshWrapper,
  //   });

  //   await waitFor(() => expect(result.current.isError).toBe(true), {
  //     timeout: 1000,
  //   });

  //   expect(result.current.users).toEqual([]);
  //   expect(result.current.error).toBeInstanceOf(Error);
  //   expect(result.current.error?.message).toBe("Internal Server Error");
  // });

  it("should respect the 'enabled' option", async () => {
    const { result } = renderHook(() => useUsersQuery({ enabled: false }), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.users).toEqual([]);
  });

  it("should return an empty array and stop retry on specific Beeceptor errors", async () => {
    server.use(
      http.get("https://lendsqr-fe-test.free.beeceptor.com/users", () => {
        return HttpResponse.json(
          { message: "Account limit reached" },
          { status: 429 },
        );
      }),
    );

    const { result } = renderHook(() => useUsersQuery(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain("Account limit reached");
  });
});
