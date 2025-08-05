import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AuthProvider, useAuth } from "../AuthProvider";

const TestComponent = () => {
  const { name, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="name">{name}</div>
      <button onClick={() => login("Frieren")}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads name from localStorage initially", async () => {
    localStorage.setItem("loggedUserName", "FrierenStored");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("name").textContent).toBe("FrierenStored");
    });
  });

  it("login sets name and saves to localStorage", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByText("Login");
    loginBtn.click();

    await waitFor(() => {
      expect(screen.getByTestId("name").textContent).toBe("Frieren");
      expect(localStorage.getItem("loggedUserName")).toBe("Frieren");
    });
  });

  it("logout clears name and localStorage", async () => {
    localStorage.setItem("loggedUserName", "FrierenStored");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    waitFor(() => {
      expect(screen.getByTestId("name").textContent).toBe("FrierenStored");
    });

    const logoutBtn = screen.getByText("Logout");
    logoutBtn.click();

    await waitFor(() => {
      expect(screen.getByTestId("name").textContent).toBe("");
    });
  });
});
