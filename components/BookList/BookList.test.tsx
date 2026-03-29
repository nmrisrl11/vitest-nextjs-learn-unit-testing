import { render, screen } from "@testing-library/react";

import BookList from "./BookList";

describe("BookList component", () => {
	const books = [
		{ id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
		{ id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
		{ id: 3, title: "1984", author: "George Orwell" },
	];

	it("should should renders a list of the correct number of books", () => {
		render(<BookList books={books} />);

		const bookItems = screen.getAllByRole("listitem");

		expect(bookItems).toHaveLength(books.length);
	});

	it("renders the book titles and authors", () => {
		render(<BookList books={books} />);

		books.forEach((book) => {
			expect(screen.getByText(book.title)).toBeInTheDocument();
			expect(screen.getByText(book.author)).toBeInTheDocument();
		});
	});
});
