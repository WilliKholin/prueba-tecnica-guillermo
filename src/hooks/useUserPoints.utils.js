const userDataStorageKey = "userPointsData";

let inMemoryPoints = (() => {
  try {
    return JSON.parse(localStorage.getItem(userDataStorageKey)) || {};
  } catch {
    return {};
  }
})();

const saveToStorage = () => {
  localStorage.setItem(userDataStorageKey, JSON.stringify(inMemoryPoints));
};

export const getUserData = (name) => {
  return inMemoryPoints[name] || {
    points: 0,
    maxPointsObtained: 0,
    autoclickers: {
      count: 0,
      nextPurchase: 10,
    }
  };
};

export const getAllUserData = () => {
  return inMemoryPoints || []
};

export const setUserPoints = (name, points) => {
  const userData = getUserData(name);
  const updatedMax = Math.max(points, userData.maxPointsObtained);

  inMemoryPoints[name] = {
    ...userData,
    points,
    maxPointsObtained: updatedMax,
  };

  saveToStorage();
};

export const incrementAutoclicker = (name, cost) => {
  const userData = getUserData(name);

  inMemoryPoints[name] = {
    ...userData,
    autoclickers: {
      count: userData.autoclickers.count + 1,
      nextPurchase: cost + 10 * userData.autoclickers.count,
    }
  };

  saveToStorage();
};

export const getAutoclickerCount = (name) => {
  return getUserData(name).autoclickers.count || 0;
};

export const getNextAutoclickerPrice = (name) => {
  return getUserData(name).autoclickers.nextPurchase || 100;
};
