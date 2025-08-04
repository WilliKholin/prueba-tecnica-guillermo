import React from "react";

export const AutoClickerComponent = React.memo(({ count, nextPurchase, points, onBuy }) => {
  const canBuy = points >= nextPurchase;

  return (
    <div className="text-center space-y-2">
      <p>Autoclickers: {count}</p>
      <p>Next Price: {nextPurchase}</p>
      <button
        onClick={onBuy}
        disabled={!canBuy}
        className={`py-2 px-4 rounded transition ${
          !canBuy
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        Buy Autoclicker
      </button>
    </div>
  );
});
