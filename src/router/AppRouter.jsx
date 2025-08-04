import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AppLayout } from "../layout/AppLayout";
import { HomePage } from "../pages/HomePage";
import { GamePage } from "../pages/GamePage";


export const AppRouter = () => {
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="home" element={<HomePage></HomePage>} />
          <Route path="game" element={<PrivateRoute><GamePage/></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AppLayout>
    </>
  );
};
