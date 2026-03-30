import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignupForm, { SignupFormProps } from "./SignupForm";

describe("SignupForm component", () => {
	const setupForm = (overrides: Partial<SignupFormProps> = {}) => {
		return {
			user: userEvent.setup(),
			...render(<SignupForm {...overrides} />),
			emailInput: screen.getByLabelText("Email"),
			passwordInput: screen.getByLabelText("Password"),
			submitButton: screen.getByRole("button", { name: /submit/i }),
		};
	};

	it("should show email validation errors for invalid email", async () => {
		const { user, emailInput } = setupForm();

		await user.type(emailInput, "invalid-email");
		const emailIssues = screen.getByRole("list", { name: /email issues/i });
		expect(emailIssues).toBeInTheDocument();

		await user.type(emailInput, "test@gmail.com");
		const noEmailIssues = screen.queryByRole("list", { name: /email issues/i });
		expect(noEmailIssues).not.toBeInTheDocument();
	});

	it("should show password validation errors when password is weak", async () => {
		const { user, passwordInput } = setupForm();

		await user.type(passwordInput, "weak1");
		const passwordIssues = screen.getByRole("list", { name: /password issues/i });
		expect(passwordIssues).toBeInTheDocument();

		expect(screen.getByText(/8 characters/i)).toBeInTheDocument();
		expect(screen.getByText(/uppercase letter/i)).toBeInTheDocument();
		expect(screen.getByText(/symbol/i)).toBeInTheDocument();

		expect(screen.queryByText(/number/i)).not.toBeInTheDocument();
	});

	it("should disable submit button initially", () => {
		const { submitButton } = setupForm();

		expect(submitButton).toBeDisabled();
	});

	it("should enable submit button when both fields are valid", async () => {
		const { user, emailInput, passwordInput, submitButton } = setupForm();

		await user.type(emailInput, "valid@gmail.com");
		await user.type(passwordInput, "Valid@123!");

		expect(submitButton).toBeEnabled();
	});
});
