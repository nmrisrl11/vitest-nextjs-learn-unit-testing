import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
	it("should renders an H1 with correct title", () => {
		render(<Home />);

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/welcome/i);
	});
});
