import React from "react";

export const LoggedName = React.memo(({ name }) => {
  return <h2 className="text-xl font-semibold text-center">Welcome, {name}!</h2>;
});
