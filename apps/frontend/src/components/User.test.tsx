import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import User from "./User";

describe("UserComponent", () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Reset mocks before each test
  });

  it("fetches and displays user data", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: "John Doe" }),
      })
    ));

    render(<User />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
  });

  it("handles fetch failure", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject(new Error("Network error")),
      })
    ));

    render(<User />);

    await waitFor(() => expect(screen.getByText(/Error: No user found/)).toBeInTheDocument());
  });
});
