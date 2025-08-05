import { renderHook } from "@testing-library/react";
import { useUsersRanking } from "../useUsersRanking";

vi.mock("../useUserPoints.utils", () => ({
  getAllUserData: vi.fn(),
}));

import { getAllUserData } from "../useUserPoints.utils";

describe("useUsersRanking hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return ranking sorted by maxPoints descending", () => {
    getAllUserData.mockReturnValue({
      alice: { maxPointsObtained: 120 },
      bob: { maxPointsObtained: 150 },
      carol: { maxPointsObtained: 100 },
    });

    const { result } = renderHook(() => useUsersRanking(0));

    expect(result.current).toEqual([
      { name: "bob", maxPoints: 150 },
      { name: "alice", maxPoints: 120 },
      { name: "carol", maxPoints: 100 },
    ]);
  });

  it("should return empty array if no data", () => {
    getAllUserData.mockReturnValue({});

    const { result } = renderHook(() => useUsersRanking(0));

    expect(result.current).toEqual([]);
  });
});
