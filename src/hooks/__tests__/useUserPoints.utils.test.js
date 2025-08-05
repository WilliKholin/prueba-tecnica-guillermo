import {
  getUserData,
  getAllUserData,
  setUserPoints,
  incrementAutoclicker,
  getAutoclickerCount,
  getNextAutoclickerPrice,
} from "../useUserPoints.utils";

describe("useUserPoints.utils", () => {
  beforeEach(() => {
  localStorage.removeItem("userPointsData");
    localStorage.clear();
    localStorage.getItem = vi.fn(() => null);
    localStorage.setItem = vi.fn();
  });

  it("returns default data if no user data is found", () => {
    const data = getUserData("newFrieren");
    expect(data).toEqual({
      points: 0,
      maxPointsObtained: 0,
      autoclickers: {
        count: 0,
        nextPurchase: 10,
      },
    });
  });

  it("setUserPoints saves points and updates maxPointsObtained correctly", () => {
    setUserPoints("frieren", 50);

    const data = getUserData("frieren");
    expect(data.points).toBe(50);
    expect(data.maxPointsObtained).toBe(50);

  });

  it("incrementAutoclicker increases count and updates nextPurchase price", () => {
    setUserPoints("frieren", 100);

    incrementAutoclicker("frieren", 20);

    const data = getUserData("frieren");
    expect(data.autoclickers.count).toBe(1);
    expect(data.autoclickers.nextPurchase).toBe(20 + 10 * 0);

    incrementAutoclicker("frieren", 30);
    const data2 = getUserData("frieren");
    expect(data2.autoclickers.count).toBe(2);
    expect(data2.autoclickers.nextPurchase).toBe(30 + 10 * 1);
  });

  it("getAutoclickerCount returns the correct autoclicker count", () => {
    setUserPoints("frieren", 0);
    expect(getAutoclickerCount("frieren")).toBe(2);

    incrementAutoclicker("frieren", 10);
    expect(getAutoclickerCount("frieren")).toBe(3);
  });

  it("getNextAutoclickerPrice returns the correct next purchase price", () => {
    setUserPoints("frieren", 0);
    expect(getNextAutoclickerPrice("frieren")).toBe(30);

    incrementAutoclicker("frieren", 20);
    expect(getNextAutoclickerPrice("frieren")).toBe(20 + 10 * 3);
  });

  it("getAllUserData returns all stored user data", () => {
    setUserPoints("aika", 10);
    setUserPoints("frieren", 20);

    const allData = getAllUserData();
    expect(allData.aika).toBeDefined();
    expect(allData.frieren).toBeDefined();
  });
});
