import { useRouter } from "next/navigation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Signup from "./page";

describe("Signup Page", () => {
	it("should redirects to /books after successful signup", async () => {
		const router = useRouter();

		render(<Signup />);

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: /submit/i });

		const user = userEvent.setup();
		await user.type(emailInput, "valid@gmail.com");
		await user.type(passwordInput, "Valid123!");
		await user.click(submitButton);

		expect(router.push).toHaveBeenCalledOnce();
		expect(router.push).toHaveBeenCalledWith("/books");
	});
});
