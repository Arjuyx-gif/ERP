// src/App.jsx
// Root router. Auth routes are public.
// Protected routes (dashboard etc.) will go inside the AppLayout route group.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RecoverPassword from "./pages/auth/RecoverPassword";

// Placeholder for your dashboard (replace later)
const Dashboard = () => (
  <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>
    <h2>✅ Logged in! Dashboard coming soon.</h2>
    <p style={{ color: "#888", marginTop: 8 }}>Replace this with your real Dashboard component.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login"   element={<SignIn />} />
        <Route path="/signup"  element={<SignUp />} />
        <Route path="/recover" element={<RecoverPassword />} />

        {/* Protected app routes (add AppLayout wrapper here later) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
