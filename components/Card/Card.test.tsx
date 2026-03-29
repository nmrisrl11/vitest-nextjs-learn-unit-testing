import { render, screen } from "@testing-library/react";

import Card from "./Card";

describe("Card component", () => {
	it("should render Card with a link and children", () => {
		render(
			<Card link="/details">
				<p>Card Content</p>
			</Card>,
		);

		const content = screen.getByText("Card Content");
		const link = screen.getByRole("link", { name: /more/i });

		expect(content).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/details");
	});
});
