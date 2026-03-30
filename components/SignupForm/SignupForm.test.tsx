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
});
