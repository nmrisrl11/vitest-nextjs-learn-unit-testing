import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import ThemedButton, { ThemedButtonProps } from "./ThemedButton";

describe("ThemedButton component", () => {
	const setupThemedButton = (overrides: Partial<ThemedButtonProps> = {}) => {
		return {
			user: userEvent.setup(),
			...render(<ThemedButton {...overrides}>Click</ThemedButton>),
			button: screen.getByRole("button"),
		};
	};

	it.each(["primary", "secondary", "danger"])(
		"should render ThemedButton with %s variant color",
		(variant) => {
			render(<ThemedButton variant={variant}>Click</ThemedButton>);

			const button = screen.getByRole("button");

			expect(button).toHaveClass(`btn-${variant}`);
		},
	);

	it("should call onClick handler when clicked", async () => {
		const handleClick = vi.fn();

		const { user, button } = setupThemedButton({ onClick: handleClick });

		await user.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should not call onClick handler when disabled", async () => {
		const handleClick = vi.fn();

		const { user, button } = setupThemedButton({ onClick: handleClick, disabled: true });

		await user.click(button);

		expect(handleClick).not.toHaveBeenCalled();
	});
});
