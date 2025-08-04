import React from "react";

export const ButtonJoin = React.memo(({ onJoin }) => {
  return (
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      onClick={onJoin}
    >
      Join
    </button>
  );
});
