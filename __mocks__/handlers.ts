import { http, HttpResponse } from "msw";

const BOOKS = [
	{ id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
	{ id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
	{ id: 3, title: "1984", author: "George Orwell" },
	{ id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
	{ id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger" },
	{ id: 6, title: "The Hobbit", author: "J.R.R. Tolkien" },
	{ id: 7, title: "Fahrenheit 451", author: "Ray Bradbury" },
	{ id: 8, title: "Moby-Dick", author: "Herman Melville" },
	{ id: 9, title: "Brave New World", author: "Aldous Huxley" },
	{ id: 10, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
];

export const handlers = [
	http.get("/api/books", () => {
		return HttpResponse.json(BOOKS);
	}),
	http.get("/api/books/:id", (request) => {
		const { id } = request.params;

		const book = BOOKS.find((b) => b.id === Number(id));

		if (!book) {
			return HttpResponse.json(null, { status: 404 });
		}

		return HttpResponse.json(book);
	}),
];
