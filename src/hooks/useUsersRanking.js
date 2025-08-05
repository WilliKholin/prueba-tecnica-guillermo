// src/hooks/useUserRanking.js
import { useMemo } from "react";
import { getAllUserData } from "../hooks/useUserPoints.utils";

export const useUsersRanking = () => {
  const ranking = useMemo(() => {
    const allData = getAllUserData();

    const usersArray = Object.entries(allData).map(([name, data]) => ({
      name,
      maxPoints: data.maxPointsObtained || 0,
    }));

    usersArray.sort((a, b) => b.maxPoints - a.maxPoints);

    return usersArray;
  }, []);

  return ranking;
};
