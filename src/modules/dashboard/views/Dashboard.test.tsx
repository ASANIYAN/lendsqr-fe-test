import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Dashboard } from "./Dashboard";
import { DashboardMetrics } from "../components/DashboardMetrics";
import { RecentLoanRequestsTable } from "../components/RecentLoanRequestsTable";
import type { LoanRequest } from "../utils/types";

describe("Dashboard", () => {
  it("renders dashboard page without crashing", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("renders all 6 metric cards with labels and values", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    const labels = [
      "TOTAL USERS",
      "ACTIVE USERS",
      "ACTIVE LOANS",
      "TOTAL SAVINGS",
      "LOAN REPAYMENT RATE",
      "PENDING REQUESTS",
    ];

    const values: Array<{ text: string; count: number }> = [
      { text: "2,453", count: 2 },
      { text: "1,230", count: 1 },
      { text: "₦12,500,000", count: 1 },
      { text: "78%", count: 1 },
      { text: "142", count: 1 },
    ];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    values.forEach((value) => {
      expect(screen.getAllByText(value.text)).toHaveLength(value.count);
    });

    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("renders recent loan requests title and all 7 rows", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Recent Loan Requests" }),
    ).toBeInTheDocument();

    const loanRequestsSection = screen.getByLabelText("Recent loan requests");
    const usernames = [
      "Adedeji",
      "Debby Ogana",
      "Grace Effiom",
      "Tosin Dokunmu",
      "Emeka Obi",
      "Chioma Eze",
      "Funmi Adeyemi",
    ];

    usernames.forEach((name) => {
      expect(within(loanRequestsSection).getByText(name)).toBeInTheDocument();
    });
  });

  it("renders status badges with correct text", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    const loanRequestsSection = screen.getByLabelText("Recent loan requests");

    expect(within(loanRequestsSection).getAllByText("Active")).toHaveLength(3);
    expect(within(loanRequestsSection).getAllByText("Pending")).toHaveLength(2);
    expect(
      within(loanRequestsSection).getByText("Blacklisted"),
    ).toBeInTheDocument();
    expect(
      within(loanRequestsSection).getByText("Inactive"),
    ).toBeInTheDocument();
  });

  it("renders fallback metric values when metric data is null", () => {
    render(<DashboardMetrics metrics={null} />);

    expect(screen.getAllByText("—")).toHaveLength(6);
  });

  it("renders empty state when no recent loan requests exist", () => {
    render(<RecentLoanRequestsTable loanRequests={[]} />);

    expect(screen.getByText("No recent loan requests")).toBeInTheDocument();
  });

  it("falls back gracefully for unrecognized status values", () => {
    const data: LoanRequest[] = [
      {
        username: "Test User",
        amount: "₦10,000",
        status: "Under Review",
        date: "Apr 01, 2020 10:00 AM",
        organization: "Lendsqr",
      },
    ];

    render(<RecentLoanRequestsTable loanRequests={data} />);

    expect(screen.getByText("Under Review")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });
});
