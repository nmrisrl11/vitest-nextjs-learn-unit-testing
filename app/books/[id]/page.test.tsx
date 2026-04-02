import { notFound, useParams } from "next/navigation";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";

import BookDetailsPage from "./page";

describe("Book Details page", () => {
	it("should render book title and author for valid id", async () => {
		vi.mocked(useParams).mockReturnValue({ id: "1" });

		render(<BookDetailsPage />);

		const title = await screen.findByText("The Great Gatsby");
		expect(title).toBeInTheDocument();
	});

	it("should call notFound for invalid book id", async () => {
		vi.mocked(useParams).mockReturnValue({ id: "11" });

		render(<BookDetailsPage />);

		const loadingMessage = screen.getByText(/loading/i);
		await waitForElementToBeRemoved(loadingMessage);

		expect(notFound).toHaveBeenCalledOnce();
	});
});
