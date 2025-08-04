import React from "react";

export const ButtonLogout = React.memo(({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
    >
      Logout
    </button>
  );
});