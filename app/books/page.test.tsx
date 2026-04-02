import { server } from "@/__mocks__/node";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import BooksPage from "./page";

describe("Books Page", () => {
	it("should renders a list of fetched books", async () => {
		render(<BooksPage />);

		const booksListItems = await screen.findAllByRole("listitem");
		expect(booksListItems.length).toBe(10);

		const bookTitle = await screen.findByText(/the hobbit/i);
		expect(bookTitle).toBeInTheDocument();
	});

	it("should display a message when there are no books", async () => {
		server.use(http.get("/api/books", () => HttpResponse.json([])));

		render(<BooksPage />);

		const noBooksMessage = await screen.findByText(/no books/i);
		expect(noBooksMessage).toBeInTheDocument();
	});
});
