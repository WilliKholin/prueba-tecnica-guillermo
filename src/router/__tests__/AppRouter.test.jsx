import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "../AppRouter";

vi.mock("../../layout/AppLayout", () => ({
  AppLayout: ({ children }) => <div data-testid="app-layout">{children}</div>,
}));
vi.mock("../../pages/HomePage", () => ({
  HomePage: () => <div>Home Page Content</div>,
}));
vi.mock("../../pages/GamePage", () => ({
  GamePage: () => <div>Game Page Content</div>,
}));
vi.mock("../PrivateRoute", () => ({
  PrivateRoute: ({ children }) => <div data-testid="private-route">{children}</div>,
}));

describe("AppRouter", () => {
  it("renders HomePage on /home route", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByText("Home Page Content")).toBeInTheDocument();
  });

  it("renders GamePage inside PrivateRoute on /game route", () => {
    render(
      <MemoryRouter initialEntries={["/game"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByTestId("private-route")).toBeInTheDocument();
    expect(screen.getByText("Game Page Content")).toBeInTheDocument();
  });

  it("redirects unknown route to /home", () => {
    render(
      <MemoryRouter initialEntries={["/Frieren"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page Content")).toBeInTheDocument();
  });
});
