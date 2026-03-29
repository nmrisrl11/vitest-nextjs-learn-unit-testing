import { render, screen } from "@testing-library/react";

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
});
