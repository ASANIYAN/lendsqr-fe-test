import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "./Sidebar";

// Mock all the asset imports
vi.mock("@/assets/switch-org.svg", () => ({
  default: "mock-switch-org.svg",
}));

vi.mock("@/assets/dropdown-icon.svg", () => ({
  default: "mock-dropdown-icon.svg",
}));

vi.mock("@/assets/dashboard.svg", () => ({
  default: "mock-dashboard.svg",
}));

vi.mock("@/assets/users.svg", () => ({
  default: "mock-users.svg",
}));

vi.mock("@/assets/guarantors.svg", () => ({
  default: "mock-guarantors.svg",
}));

vi.mock("@/assets/loans.svg", () => ({
  default: "mock-loans.svg",
}));

vi.mock("@/assets/decision-models.svg", () => ({
  default: "mock-decision-models.svg",
}));

vi.mock("@/assets/savings.svg", () => ({
  default: "mock-savings.svg",
}));

vi.mock("@/assets/loan-requests.svg", () => ({
  default: "mock-loan-requests.svg",
}));

vi.mock("@/assets/whitelist.svg", () => ({
  default: "mock-whitelist.svg",
}));

vi.mock("@/assets/karma.svg", () => ({
  default: "mock-karma.svg",
}));

vi.mock("@/assets/organisation.svg", () => ({
  default: "mock-organisation.svg",
}));

vi.mock("@/assets/loan-product.svg", () => ({
  default: "mock-loan-product.svg",
}));

vi.mock("@/assets/savings-product.svg", () => ({
  default: "mock-savings-product.svg",
}));

vi.mock("@/assets/fees-and-charges.svg", () => ({
  default: "mock-fees-and-charges.svg",
}));

vi.mock("@/assets/transactions.svg", () => ({
  default: "mock-transactions.svg",
}));

vi.mock("@/assets/services.svg", () => ({
  default: "mock-services.svg",
}));

vi.mock("@/assets/service-acount.svg", () => ({
  default: "mock-service-account.svg",
}));

vi.mock("@/assets/settlements.svg", () => ({
  default: "mock-settlements.svg",
}));

vi.mock("@/assets/reports.svg", () => ({
  default: "mock-reports.svg",
}));

vi.mock("@/assets/preferences.svg", () => ({
  default: "mock-preferences.svg",
}));

vi.mock("@/assets/fees-and-pricing.svg", () => ({
  default: "mock-fees-and-pricing.svg",
}));

vi.mock("@/assets/audit-logs.svg", () => ({
  default: "mock-audit-logs.svg",
}));

// Test wrapper with router
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Sidebar", () => {
  const defaultProps = {
    isOpen: true,
    setIsOpen: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders switch organization section", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );

    expect(screen.getByText("Switch Organization")).toBeInTheDocument();
  });

  it("renders dashboard item", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders all customer section items", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );

    expect(screen.getByText("CUSTOMERS")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Guarantors")).toBeInTheDocument();
    expect(screen.getByText("Loans")).toBeInTheDocument();
  });

  it("renders businesses section items", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );

    expect(screen.getByText("BUSINESSES")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Loan Products")).toBeInTheDocument();
  });

  it("renders settings section items", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );

    expect(screen.getByText("SETTINGS")).toBeInTheDocument();
    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Fees and Pricing")).toBeInTheDocument();
    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
  });

  it("shows close button when sidebar is open", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );

    const closeElements = screen.getAllByLabelText("Close sidebar");
    const closeButton = closeElements.find((el) => el.tagName === "BUTTON");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls setIsOpen when close button is clicked", () => {
    const mockSetIsOpen = vi.fn();
    render(
      <TestWrapper>
        <Sidebar isOpen={true} setIsOpen={mockSetIsOpen} />
      </TestWrapper>,
    );

    const closeButtons = screen.getAllByLabelText("Close sidebar");
    const closeButton = closeButtons.find((btn) => btn.tagName === "BUTTON");
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    }
  });

  it("calls setIsOpen when backdrop is clicked", () => {
    const mockSetIsOpen = vi.fn();
    render(
      <TestWrapper>
        <Sidebar isOpen={true} setIsOpen={mockSetIsOpen} />
      </TestWrapper>,
    );

    const closeElements = screen.getAllByLabelText("Close sidebar");
    const backdrop = closeElements.find((el) => el.tagName === "DIV");
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    }
  });

  it("applies correct CSS classes based on open state", () => {
    const { rerender } = render(
      <TestWrapper>
        <Sidebar isOpen={false} setIsOpen={vi.fn()} />
      </TestWrapper>,
    );

    let sidebar = document.querySelector("aside");
    expect(sidebar).not.toHaveClass("_sidebarOpen_d51875");

    rerender(
      <TestWrapper>
        <Sidebar isOpen={true} setIsOpen={vi.fn()} />
      </TestWrapper>,
    );

    sidebar = document.querySelector("aside");
    expect(sidebar).toHaveClass("_sidebarOpen_d51875");
  });
});
