// src/App.jsx
// Root router. Auth routes are public.
// Protected routes (dashboard etc.) will go inside the AppLayout route group.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn          from "./pages/auth/SignIn";
import SignUp          from "./pages/auth/SignUp";
import RecoverPassword from "./pages/auth/RecoverPassword";
import MainDashboard   from "./pages/dashboard/MainDashboard";
import RFPDashboard    from "./pages/dashboard/RFPDashboard";
import PlaceholderPage from "./pages/PlaceholderPage";

const ph = title => <PlaceholderPage title={title} />;

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login"   element={<SignIn />} />
      <Route path="/signup"  element={<SignUp />} />
      <Route path="/recover" element={<RecoverPassword />} />

      {/* App */}
      <Route path="/dashboard"        element={<MainDashboard />} />
      <Route path="/rfp-dashboard"    element={<RFPDashboard />} />
      <Route path="/sof-dashboard"    element={ph("SOF Dashboard")} />
      <Route path="/sales-coordinator"element={ph("Sales Coordinator Dashboard")} />
      <Route path="/tracker"          element={ph("Tracker")} />
      <Route path="/task-inbox"       element={ph("Task Inbox")} />
      <Route path="/reports"          element={ph("Reports")} />
      <Route path="/master-data"      element={ph("Master Data")} />
      <Route path="/settings"         element={ph("Settings")} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
