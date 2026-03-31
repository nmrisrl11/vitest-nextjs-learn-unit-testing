import { render, screen } from "@testing-library/react";

import BooksPage from "./page";

describe("Books Page", () => {
	it("should renders a list of fetched books", async () => {
		render(<BooksPage />);

		const booksListItems = await screen.findAllByRole("listitem");
		expect(booksListItems.length).toBe(10);

		const bookTitle = await screen.findByText(/the hobbit/i);
		expect(bookTitle).toBeInTheDocument();
	});
});
