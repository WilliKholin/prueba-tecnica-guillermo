import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import {useUserPoints} from '../hooks/useUserPoints'
export const GamePage = () => {
  const { name, logout } = useAuth();
  const { points, autoclickers, addPoint, buyAutoclicker, stopAutoclicker } = useUserPoints(name);

  const handleLogout = () => {
    stopAutoclicker();
    logout();
  };

  const handleClick = () => {
    addPoint();
  };

  const handleBuy = () => {
    if (points >= autoclickers.nextPurchase) {
      buyAutoclicker();
    }
  };

    useEffect(() => {
    return () => {
      stopAutoclicker();
    };
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", maxWidth: "300px" }}>
      <h2>{name}</h2>
      <p>Points: {points}</p>
      <button onClick={handleClick}>Gain points</button>

      <hr />

      <p>Autoclickers: {autoclickers.count}</p>
      <p>Next price: {autoclickers.nextPurchase}</p>
      <button onClick={handleBuy} disabled={points < autoclickers.nextPurchase}>
        Buy autoclicker
      </button>

      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};
