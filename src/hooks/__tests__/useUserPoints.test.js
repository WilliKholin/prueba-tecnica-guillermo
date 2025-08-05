import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useUserPoints } from "../useUserPoints";
import {
  getUserData,
  setUserPoints,
  incrementAutoclicker,
  getNextAutoclickerPrice,
} from "../useUserPoints.utils";


vi.mock("../useUserPoints.utils", () => ({
  getUserData: vi.fn(() => ({
    points: 30,
    maxPointsObtained: 30,
    autoclickers: { count: 1, nextPurchase: 20 },
  })),
  setUserPoints: vi.fn(),
  incrementAutoclicker: vi.fn(),
  getNextAutoclickerPrice: vi.fn(() => 20),
}));

describe("useUserPoints hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with data from getUserData", () => {
    const { result } = renderHook(() => useUserPoints("Frieren"));

    expect(getUserData).toHaveBeenCalledWith("Frieren");
    expect(result.current.points).toBe(30);
    expect(result.current.maxPointsObtained).toBe(30);
    expect(result.current.autoclickers.count).toBe(1);
  });

  it("addPoint increments points and calls setUserPoints", () => {
    const { result } = renderHook(() => useUserPoints("Frieren"));

    act(() => {
      result.current.addPoint(1);
    });

    expect(setUserPoints).toHaveBeenCalled();
    expect(result.current.points).toBe(31);
  });

  it("buyAutoclicker calls incrementAutoclicker and updates autoclickers", () => {
    const { result } = renderHook(() => useUserPoints("Frieren"));

    act(() => {
      result.current.buyAutoclicker();
    });

    expect(getNextAutoclickerPrice).toHaveBeenCalledWith("Frieren");
    expect(incrementAutoclicker).toHaveBeenCalledWith("Frieren", 20);
    expect(setUserPoints).toHaveBeenCalled();
  });

  it("stopAutoclicker clears interval", () => {
    vi.useFakeTimers();
    const { result, unmount } = renderHook(() => useUserPoints("Frieren"));

    act(() => {
      result.current.stopAutoclicker();
    });

    const clearSpy = vi.spyOn(global, "clearInterval");

    act(() => {
      result.current.stopAutoclicker();
    });

    expect(clearSpy).toHaveBeenCalled();

    clearSpy.mockRestore();
    vi.useRealTimers();
    unmount();
  });
});
