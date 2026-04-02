import "@testing-library/jest-dom/vitest";

import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "./__mocks__/node";

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	vi.resetAllMocks();
});
afterAll(() => server.close());

vi.mock("next/navigation", () => {
	const push = vi.fn();
	const replace = vi.fn();
	const back = vi.fn();
	const forward = vi.fn();
	const refresh = vi.fn();

	return {
		useRouter: () => ({ push, replace, back, forward, refresh }),
		useParams: vi.fn(),
		notFound: vi.fn(),
	};
});
