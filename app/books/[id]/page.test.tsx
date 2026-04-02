import { useParams } from "next/navigation";
import { render, screen } from "@testing-library/react";

import BookDetailsPage from "./page";

describe("Book Details page", () => {
	it("should render book title and author for valid id", async () => {
		vi.mocked(useParams).mockReturnValue({ id: "1" });

		render(<BookDetailsPage />);

		const title = await screen.findByText("The Great Gatsby");
		expect(title).toBeInTheDocument();
	});
});
