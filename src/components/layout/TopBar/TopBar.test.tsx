import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TopBar from "./TopBar";

// Mock the asset imports
vi.mock("../../../assets/lendsqr-logo.png", () => ({
  default: "mock-logo.png",
}));

vi.mock("../../../assets/dummy-avatar.svg", () => ({
  default: "mock-avatar.svg",
}));

// Mock SearchInput component
vi.mock("../../common/Input/SearchInput", () => ({
  SearchInput: ({ placeholder }: { placeholder: string }) => (
    <input data-testid="search-input" placeholder={placeholder} />
  ),
}));

// Test wrapper component
const TestWrapper = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <TopBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
  );
};

describe("TopBar", () => {
  it("renders the logo", () => {
    render(<TestWrapper />);
    const logo = screen.getByAltText("Lendsqr");
    expect(logo).toBeInTheDocument();
  });

  it("renders the search input with correct placeholder", () => {
    render(<TestWrapper />);
    const searchInput = screen.getByPlaceholderText("Search for anything");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders the docs link", () => {
    render(<TestWrapper />);
    const docsLink = screen.getByText("Docs");
    expect(docsLink).toBeInTheDocument();
    expect(docsLink.tagName).toBe("A");
  });

  it("renders the notification button", () => {
    render(<TestWrapper />);
    const notificationBtn = screen.getByLabelText("Notifications");
    expect(notificationBtn).toBeInTheDocument();
  });

  it("renders user information", () => {
    render(<TestWrapper />);
    const userName = screen.getByText("Adedeji");
    const userAvatar = screen.getByAltText("User Avatar");
    expect(userName).toBeInTheDocument();
    expect(userAvatar).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<TestWrapper />);
    const mobileMenuBtn = screen.getByLabelText("Toggle menu");
    expect(mobileMenuBtn).toBeInTheDocument();
  });

  it("calls setIsSidebarOpen when mobile menu is clicked", () => {
    const mockSetSidebarOpen = vi.fn();
    render(
      <TopBar isSidebarOpen={false} setIsSidebarOpen={mockSetSidebarOpen} />,
    );

    const mobileMenuBtn = screen.getByLabelText("Toggle menu");
    fireEvent.click(mobileMenuBtn);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(true);
  });
});
