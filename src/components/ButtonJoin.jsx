import React from "react";

export const ButtonJoin = React.memo(({ onJoin }) => {
  return (
    <button
      className="bg-blue-base text-white py-2 px-4 rounded hover:bg-blue-hover transition"
      onClick={onJoin}
    >
      Join
    </button>
  );
});
