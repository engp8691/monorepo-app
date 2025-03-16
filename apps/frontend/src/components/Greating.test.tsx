import { render, screen, waitFor } from "@testing-library/react";
import Greeting from "./Greeting";
import { vi } from "vitest";

// Reset mocks before each test
beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Greeting Component", () => {
  it("displays 'Loading...' initially", () => {
    render(<Greeting />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("fetches and displays the greeting", async () => {
    // Mock fetch to return a greeting response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ greeting: "Hello, Vitest!" }),
      })
    ) as jest.Mock;

    render(<Greeting />);

    // Ensure "Loading..." is shown first
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the greeting to appear
    await waitFor(() => {
      expect(screen.getByText("Hello, Vitest!")).toBeInTheDocument();
    });
  });

  it("shows an error message if the fetch request fails", async () => {
    // Mock fetch to simulate a failed request
    global.fetch = vi.fn(() => Promise.reject(new Error("Failed to fetch greeting")));

    render(<Greeting />);

    // Ensure "Loading..." is shown first
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch greeting")).toBeInTheDocument();
    });
  });
});
