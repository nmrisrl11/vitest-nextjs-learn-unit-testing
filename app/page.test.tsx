import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "./page";

describe("Home Page", () => {
	it("should renders an H1 with correct title", () => {
		render(<Home />);

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/welcome/i);
	});

	it("should initially does not show the More Features list", () => {
		render(<Home />);

		const toggleMoreButton = screen.getByRole("button", { name: /show more/i });
		expect(toggleMoreButton).toBeInTheDocument();

		const moreFeatureList = screen.queryByRole("list", { name: /more features/i });
		expect(moreFeatureList).not.toBeInTheDocument();
	});

	it("should shows the More Features list when the button is clicked", async () => {
		render(<Home />);

		const toggleMoreButton = screen.getByRole("button", { name: /show more/i });

		const user = userEvent.setup();
		await user.click(toggleMoreButton);

		const moreFeatureList = screen.getByRole("list", { name: /more features/i });
		expect(moreFeatureList).toBeInTheDocument();

		expect(toggleMoreButton).toHaveTextContent(/show less/i);
	});
});
