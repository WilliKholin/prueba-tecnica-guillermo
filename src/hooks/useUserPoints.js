import { useEffect, useState, useRef  } from "react";
import {
  getUserData,
  setUserPoints,
  incrementAutoclicker,
  getAutoclickerCount,
  getNextAutoclickerPrice,
} from "./useUserPoints.utils";


export const useUserPoints = (name) => {
  const [points, setPoints] = useState(0);
  const [maxPointsObtained, setMaxPointsObtained] = useState(0);
  const [autoclickers, setAutoclickers] = useState({ count: 0, nextPurchase: 10 });

  useEffect(() => {
    const { points, maxPointsObtained, autoclickers } = getUserData(name);
    setPoints(points);
    setMaxPointsObtained(maxPointsObtained);
    setAutoclickers(autoclickers);
  }, [name]);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (autoclickers.count === 0) return;

    intervalRef.current = setInterval(() => {
      const newPoints = points + autoclickers.count;
      addPoint(autoclickers.count);
      setUserPoints(name, newPoints);
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoclickers.count, points, name, maxPointsObtained]);

  const addPoint = (increment = 1) => {
    const newPoints = points + increment;
    setPoints(newPoints);
    setUserPoints(name, newPoints);
    if (newPoints > maxPointsObtained) setMaxPointsObtained(newPoints);
  };

  const buyAutoclicker = () => {
    const price = getNextAutoclickerPrice(name);
    if (points >= price) {
      const newPoints = points - price;
      setPoints(newPoints);
      incrementAutoclicker(name, price);
      const newData = getUserData(name);
      setAutoclickers(newData.autoclickers);
      setUserPoints(name, newPoints);
    }
  };

  const stopAutoclicker = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return {
    points,
    maxPointsObtained,
    autoclickers,
    addPoint,
    buyAutoclicker,
    stopAutoclicker
  };
};
