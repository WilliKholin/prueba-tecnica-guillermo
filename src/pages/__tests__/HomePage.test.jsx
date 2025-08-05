import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomePage } from "../HomePage";

const login = vi.fn();
const mockedNavigate = vi.fn();

vi.mock("../../context/AuthProvider", () => ({
  useAuth: () => ({
    login,
  }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

vi.mock("../../components/InputName", () => ({
  InputName: ({ name, setName }) => (
    <input
      placeholder="Your name..."
      value={name}
      onChange={e => setName(e.target.value)}
      data-testid="input-name"
    />
  ),
}));

vi.mock("../../components/ButtonJoin", () => ({
  ButtonJoin: ({ onJoin }) => (
    <button onClick={onJoin}>Join</button>
  ),
}));

vi.mock("../../components/GeneralError", () => ({
  GeneralError: ({ error }) => (
    <p role="alert">{error}</p>
  ),
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<HomePage />);
    expect(screen.getByText(/Create a new player/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name...")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
  });

  it("shows error if user tries to join with empty name", () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText("Join"));
    expect(screen.getByRole("alert")).toHaveTextContent("Please enter a name!");
    expect(login).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("calls login and navigate when name is entered and Join clicked", () => {
    render(<HomePage />);

    const input = screen.getByTestId("input-name");
    fireEvent.change(input, { target: { value: "Frieren" } });

    fireEvent.click(screen.getByText("Join"));

    expect(login).toHaveBeenCalledWith("Frieren");
    expect(mockedNavigate).toHaveBeenCalledWith("/game");
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
