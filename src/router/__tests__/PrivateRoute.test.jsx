import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../PrivateRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockUseAuth = vi.fn();

vi.mock("../../context/AuthProvider", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("PrivateRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading when isLoading is true", () => {
    mockUseAuth.mockReturnValue({ isLoading: true, name: null });
    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    mockUseAuth.mockReturnValue({ isLoading: false, name: "TestUser" });
    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  it("redirects to /home when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({ isLoading: false, name: "" });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <div>Protected content</div>
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
