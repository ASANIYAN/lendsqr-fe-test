import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";

// Define a proper form schema
interface TestFormData {
  email: string;
  password: string;
}

interface SingleFieldFormData {
  email: string;
}

// Update TestForm component
function TestForm({
  onSubmit,
  defaultValues = {},
}: {
  onSubmit: (data: TestFormData) => void;
  defaultValues?: Partial<TestFormData>;
}) {
  const { control, handleSubmit } = useForm<TestFormData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Update TestFormWithValidation component
function TestFormWithValidation({
  onSubmit,
}: {
  onSubmit: (data: SingleFieldFormData) => void;
  rules?: Record<string, unknown>;
}) {
  const { control, handleSubmit } = useForm<SingleFieldFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="email"
        label="Email Address"
        placeholder="Enter email"
        type="email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

describe("FormInput", () => {
  /**
   * RENDERING TESTS
   */

  it("renders input with label", () => {
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();
  });

  it("renders without label when not provided", () => {
    const { control } = useForm();
    render(<FormInput control={control} name="email" placeholder="Email" />);

    // Should not find label
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    // But input should exist
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    const { control } = useForm();
    render(
      <FormInput
        control={control}
        name="email"
        label="Email"
        description="We'll never share your email"
      />,
    );

    expect(
      screen.getByText(/we'll never share your email/i),
    ).toBeInTheDocument();
  });

  it("integrates with react-hook-form and submits data", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn<(data: TestFormData) => void>();

    render(<TestForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          password: "password123",
        },
        expect.anything(),
      );
    });
  });

  it("populates input with default value from form", () => {
    const onSubmit = vi.fn();

    render(
      <TestForm
        onSubmit={onSubmit}
        defaultValues={{ email: "default@example.com" }}
      />,
    );

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    expect(emailInput).toHaveValue("default@example.com");
  });

  /**
   * PASSWORD TOGGLE TESTS
   */

  it("shows password toggle button for password input", () => {
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);

    // Password field should have SHOW button
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    expect(toggleButton).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("does not show password toggle for non-password inputs", () => {
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);

    // Email field should NOT have toggle
    const buttons = screen.getAllByRole("button");
    const showButtons = buttons.filter(
      (btn) => btn.textContent === "SHOW" || btn.textContent === "HIDE",
    );

    // Should only have 1 SHOW button (for password field)
    expect(showButtons).toHaveLength(1);
  });

  it("toggles password visibility when toggle button is clicked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TestForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    // Initially password type
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleButton).toHaveTextContent("SHOW");

    // Click to show
    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(toggleButton).toHaveTextContent("HIDE");

    // Click to hide again
    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleButton).toHaveTextContent("SHOW");
  });

  /**
   * ERROR HANDLING TESTS
   */

  it("displays error message when validation fails", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestFormWithValidation
        onSubmit={onSubmit}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Submit empty form
    await user.click(submitButton);

    // Should show required error
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    // Type invalid email
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    // Should show pattern error
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it("applies data-invalid attribute to field when error exists", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    const { container } = render(
      <TestFormWithValidation
        onSubmit={onSubmit}
        rules={{ required: "Email is required" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      const field = container.querySelector('[data-invalid="true"]');
      expect(field).toBeInTheDocument();
    });
  });

  /**
   * VARIANT TESTS
   */

  it("applies primary variant by default", () => {
    const { control } = useForm();
    const { container } = render(
      <FormInput control={control} name="email" placeholder="Email" />,
    );

    const inputContainer = container.querySelector('[class*="primary"]');
    expect(inputContainer).toBeInTheDocument();
  });

  it("applies secondary variant when specified", () => {
    const { control } = useForm();
    const { container } = render(
      <FormInput
        control={control}
        name="username"
        placeholder="Username"
        variant="secondary"
      />,
    );

    const inputContainer = container.querySelector('[class*="secondary"]');
    expect(inputContainer).toBeInTheDocument();
  });
});
