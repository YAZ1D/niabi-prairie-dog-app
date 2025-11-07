import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx"; // handles Supabase auth + redirects
import AppLayout from "./layout/AppLayout";
import DashboardHome from "./pages/DashboardHome";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Root app handles login/signup */}
        <Route path="/" element={<App />} />

        {/* Dashboard layout wraps all logged-in pages */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          {/* add more later: */}
          {/* <Route path="/charts" element={<ChartsPage />} /> */}
          {/* <Route path="/tables" element={<TablesPage />} /> */}
          {/* <Route path="/profile" element={<UserProfile />} /> */}
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
