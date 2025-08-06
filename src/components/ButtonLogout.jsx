import React from "react";

export const ButtonLogout = React.memo(({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="bg-blue-base text-white px-3 py-1 rounded hover:bg-blue-hover transition"
    >
      Logout
    </button>
  );
});