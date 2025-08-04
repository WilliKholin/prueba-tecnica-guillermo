import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="home" element={<PublicRoute></PublicRoute>} />
        <Route path="game" element={<PrivateRoute></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};
