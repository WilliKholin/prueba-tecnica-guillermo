import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GamePage } from "../GamePage";

const logout = vi.fn();
const addPoint = vi.fn();
const buyAutoclicker = vi.fn();
const stopAutoclicker = vi.fn();

vi.mock("../../context/AuthProvider", () => ({
  useAuth: () => ({
    name: "TestUser",
    logout,  
  }),
}));

vi.mock("../../hooks/useUserPoints", () => ({
  useUserPoints: () => ({
    points: 100,
    autoclickers: { count: 2, nextPurchase: 50 },
    addPoint,
    buyAutoclicker,
    stopAutoclicker,
  }),
}));

vi.mock("../../hooks/useUsersRanking", () => ({
  useUsersRanking: () => [
    { name: "Frieren", maxPoints: 150 },
    { name: "Aika", maxPoints: 120 },
  ],
}));

vi.mock("../../components/ButtonLogout", () => ({
  ButtonLogout: ({ onLogout }) => <button onClick={onLogout}>Logout</button>,
}));
vi.mock("../../components/PointsComponent", () => ({
  PointsComponent: ({ points, onGainPoint }) => (
    <>
      <div>Points: {points}</div>
      <button onClick={onGainPoint}>Gain Points</button>
    </>
  ),
}));
vi.mock("../../components/AutoClickerComponent", () => ({
  AutoClickerComponent: ({ count, nextPurchase, points, onBuy }) => (
    <>
      <div>Autoclickers: {count}</div>
      <div>Next Purchase: {nextPurchase}</div>
      <button onClick={onBuy}>Buy</button>
    </>
  ),
}));
vi.mock("../../components/LoggedName", () => ({
  LoggedName: ({ name }) => <div>Welcome, {name}</div>,
}));
vi.mock("../../components/RankingComponent", () => ({
  RankingComponent: ({ ranking }) => (
    <div>
      Ranking:
      {ranking.map((user) => (
        <div key={user.name}>
          {user.name} - {user.maxPoints}
        </div>
      ))}
    </div>
  ),
}));



describe("GamePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all components with correct data", () => {
    render(<GamePage />);

    expect(screen.getByText(/Welcome, TestUser/i)).toBeInTheDocument();
    expect(screen.getByText(/Points: 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Autoclickers: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Purchase: 50/i)).toBeInTheDocument();
    expect(screen.getByText(/Ranking:/i)).toBeInTheDocument();
    expect(screen.getByText(/Frieren - 150/i)).toBeInTheDocument();
    expect(screen.getByText(/Aika - 120/i)).toBeInTheDocument();
  });

  it("calls handlers when buttons are clicked", () => {
    render(<GamePage />);

    fireEvent.click(screen.getByText("Gain Points"));
    expect(addPoint).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Buy"));
    expect(buyAutoclicker).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Logout"));
    expect(stopAutoclicker).toHaveBeenCalled();
    expect(logout).toHaveBeenCalled();
  });
});
