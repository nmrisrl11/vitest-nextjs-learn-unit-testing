import { render, screen } from "@testing-library/react";
import useEvent from "@testing-library/user-event";

import ThemedButton from "./ThemedButton";

describe("ThemedButton component", () => {
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

		render(<ThemedButton onClick={handleClick}>Click</ThemedButton>);

		const button = screen.getByRole("button");
		const user = useEvent.setup();
		await user.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should not call onClick handler when disabled", async () => {
		const handleClick = vi.fn();

		render(
			<ThemedButton onClick={handleClick} disabled>
				Click
			</ThemedButton>,
		);

		const button = screen.getByRole("button");
		const user = useEvent.setup();
		await user.click(button);

		expect(handleClick).not.toHaveBeenCalled();
	});
});
