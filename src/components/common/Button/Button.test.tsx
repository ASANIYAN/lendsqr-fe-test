import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { Button } from "./Button";
import { UserPlus } from "lucide-react";

describe("Button", () => {
  it("renders button with text content", () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("renders as submit button when type is submit", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button", { name: /click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: /click me/i }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} loading>
        Click me
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: /click me/i }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("displays loading spinner when loading prop is true", () => {
    render(<Button loading>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });

    // Button should be disabled when loading
    expect(button).toBeDisabled();

    // Should have aria-busy attribute for screen readers
    expect(button).toHaveAttribute("aria-busy", "true");

    // Spinner should be present (svg element)
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("shows button text even when loading", () => {
    render(<Button loading>Processing</Button>);

    expect(screen.getByText(/processing/i)).toBeInTheDocument();
  });

  it("hides left icon when loading but shows right icon", () => {
    render(
      <Button
        loading
        leftIcon={<UserPlus data-testid="left-icon" />}
        rightIcon={<UserPlus data-testid="right-icon" />}
      >
        Submit
      </Button>,
    );

    expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();

    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("renders left icon when provided", () => {
    render(
      <Button leftIcon={<UserPlus data-testid="left-icon" />}>Add User</Button>,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders right icon when provided", () => {
    render(
      <Button rightIcon={<UserPlus data-testid="right-icon" />}>
        Add User
      </Button>,
    );

    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("is keyboard accessible", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });

    // Tab to focus the button
    await user.tab();
    expect(button).toHaveFocus();

    // Press Enter to click
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Press Space to click
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("has correct ARIA attributes when disabled", () => {
    render(<Button disabled>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("has correct ARIA attributes when loading", () => {
    render(<Button loading>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  /**
   * VARIANT TESTS
   * Verify different button variants work
   */

  it("accepts and applies custom className", () => {
    render(<Button className="custom-class">Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button.className).toContain("custom-class");
  });

  it("forwards ref to button element", () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(<Button ref={ref}>Submit</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
