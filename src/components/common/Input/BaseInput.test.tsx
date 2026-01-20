import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BaseInput } from "./BaseInput";
import { Search, X } from "lucide-react";

describe("BaseInput", () => {
  it("renders input with placeholder", () => {
    render(<BaseInput placeholder="Enter email" />);

    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
  });

  it("renders with primary variant by default", () => {
    const { container } = render(<BaseInput />);

    const inputContainer = container.firstChild as HTMLElement;
    expect(inputContainer.className).toContain("primary");
  });

  it("renders with secondary variant when specified", () => {
    const { container } = render(<BaseInput variant="secondary" />);

    const inputContainer = container.firstChild as HTMLElement;
    expect(inputContainer.className).toContain("secondary");
  });

  it("renders left icon when provided", () => {
    render(
      <BaseInput
        leftIcon={<Search data-testid="search-icon" />}
        placeholder="Search"
      />,
    );

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("renders right icon when provided", () => {
    render(
      <BaseInput
        rightIcon={<X data-testid="clear-icon" />}
        placeholder="Search"
      />,
    );

    expect(screen.getByTestId("clear-icon")).toBeInTheDocument();
  });

  it("renders both left and right icons", () => {
    render(
      <BaseInput
        leftIcon={<Search data-testid="left-icon" />}
        rightIcon={<X data-testid="right-icon" />}
        placeholder="Search"
      />,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  /**
   * ERROR STATE TESTS
   */

  it("applies error styling when error prop is true", () => {
    render(<BaseInput error placeholder="Email" />);

    const input = screen.getByPlaceholderText(/email/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("does not have aria-invalid when error is false", () => {
    render(<BaseInput error={false} placeholder="Email" />);

    const input = screen.getByPlaceholderText(/email/i);
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  /**
   * DISABLED STATE TESTS
   */

  it("is disabled when disabled prop is true", () => {
    render(<BaseInput disabled placeholder="Email" />);

    const input = screen.getByPlaceholderText(/email/i);
    expect(input).toBeDisabled();
  });

  it("is not disabled by default", () => {
    render(<BaseInput placeholder="Email" />);

    const input = screen.getByPlaceholderText(/email/i);
    expect(input).not.toBeDisabled();
  });

  /**
   * INTERACTION TESTS
   */

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<BaseInput placeholder="Email" />);

    const input = screen.getByPlaceholderText(/email/i);

    await user.type(input, "test@example.com");

    expect(input).toHaveValue("test@example.com");
  });

  it("calls onChange handler when input changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<BaseInput placeholder="Email" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/email/i);

    await user.type(input, "a");

    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onBlur handler when input loses focus", async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();

    render(<BaseInput placeholder="Email" onBlur={handleBlur} />);

    const input = screen.getByPlaceholderText(/email/i);

    await user.click(input);
    await user.tab(); // Move focus away

    expect(handleBlur).toHaveBeenCalled();
  });

  /**
   * TYPE TESTS
   */

  it("renders as password input when type is password", () => {
    render(<BaseInput type="password" placeholder="Password" />);

    const input = screen.getByPlaceholderText(/password/i);
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders as email input when type is email", () => {
    render(<BaseInput type="email" placeholder="Email" />);

    const input = screen.getByPlaceholderText(/email/i);
    expect(input).toHaveAttribute("type", "email");
  });

  /**
   * REF FORWARDING TEST
   */

  it("forwards ref to input element", () => {
    const ref = { current: null as HTMLInputElement | null };

    render(<BaseInput ref={ref} placeholder="Email" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe("INPUT");
  });

  /**
   * CUSTOM CLASSNAME TEST
   */

  it("accepts and applies custom className to input", () => {
    render(<BaseInput className="custom-input" placeholder="Email" />);

    const input = screen.getByPlaceholderText(/email/i);
    expect(input.className).toContain("custom-input");
  });

  it("accepts and applies custom containerClassName", () => {
    const { container } = render(
      <BaseInput containerClassName="custom-container" placeholder="Email" />,
    );

    const inputContainer = container.firstChild as HTMLElement;
    expect(inputContainer.className).toContain("custom-container");
  });
});
