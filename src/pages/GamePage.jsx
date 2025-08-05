import { useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthProvider";
import { useUserPoints } from "../hooks/useUserPoints";
import { useUsersRanking } from "../hooks/useUsersRanking";
import { ButtonLogout } from "../components/ButtonLogout";
import { PointsComponent } from "../components/PointsComponent";
import { AutoClickerComponent } from "../components/AutoClickerComponent";
import { LoggedName } from "../components/LoggedName";
import { RankingComponent } from "../components/RankingComponent";


export const GamePage = () => {
  const { name, logout } = useAuth();
  const { points, autoclickers, addPoint, buyAutoclicker, stopAutoclicker } =
    useUserPoints(name);
  const ranking = useUsersRanking(points);

  const handleLogout = useCallback(() => {
    stopAutoclicker();
    logout();
  }, [logout]);

  const handleClick = () => {
    addPoint();
  };

  const handleBuy = useCallback(() => {
    if (points >= autoclickers.nextPurchase) {
      buyAutoclicker();
    }
  }, [points, autoclickers.nextPurchase]);

  useEffect(() => {
    return () => {
      stopAutoclicker();
    };
  }, []);

  return (
    <div className="relative p-6 max-w-md mx-auto bg-white shadow-md rounded-lg mt-8 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <LoggedName name={name} />
        <ButtonLogout onLogout={handleLogout} />
      </div>

      <PointsComponent points={points} onGainPoint={handleClick} />
      <AutoClickerComponent
        count={autoclickers.count}
        nextPurchase={autoclickers.nextPurchase}
        points={points}
        onBuy={handleBuy}
      />
      <RankingComponent ranking={ranking}/>
    </div>
  );
};
