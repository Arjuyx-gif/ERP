// src/App.jsx
// Root router. Auth routes are public.
// Protected routes (dashboard etc.) will go inside the AppLayout route group.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn          from "./pages/auth/SignIn";
import SignUp          from "./pages/auth/SignUp";
import RecoverPassword from "./pages/auth/RecoverPassword";
import MainDashboard   from "./pages/dashboard/MainDashboard";
import RFPDashboard    from "./pages/dashboard/RFPDashboard";
import RFPAnalysisForm from "./pages/dashboard/RFPAnalysisForm";
import PreSalesChecklist from "./pages/dashboard/PreSalesChecklist";
import ComparisonSheet   from "./pages/dashboard/ComparisonSheet";
import ComparisonSheetDetail from "./pages/dashboard/ComparisonSheetDetail";
import TenderChecklist from "./pages/dashboard/TenderChecklist";
import SOFDashboard    from "./pages/dashboard/SOFDashboard";
import SalesOrderForm  from "./pages/dashboard/SalesOrderForm";
import SCDashboard     from "./pages/dashboard/SCDashboard";
import TaskInbox       from "./pages/dashboard/TaskInbox";
import PurchaseTaskInbox from "./pages/dashboard/PurchaseTaskInbox";
import PurchaseOrderForm from "./pages/dashboard/PurchaseOrderForm";
import EMDForm         from "./pages/dashboard/EMDForm";
import OrderTracker    from "./pages/dashboard/OrderTracker";
import OrderEditForm   from "./pages/dashboard/OrderEditForm";
import EMDBGTracker    from "./pages/dashboard/EMDBGTracker";
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
      <Route path="/rfp-analysis-form" element={<RFPAnalysisForm />} />
      <Route path="/pre-sales-checklist" element={<PreSalesChecklist />} />
      <Route path="/comparison-sheet"  element={<ComparisonSheet />} />
      <Route path="/comparison-sheet-detail" element={<ComparisonSheetDetail />} />
      <Route path="/tender-checklist" element={<TenderChecklist />} />
      <Route path="/sof-dashboard"    element={<SOFDashboard />} />
      <Route path="/sales-order-form" element={<SalesOrderForm />} />
      <Route path="/sc-dashboard"     element={<SCDashboard />} />
      <Route path="/sc-rfp-dashboard" element={<RFPDashboard />} />
      <Route path="/sc-sof-dashboard" element={<SOFDashboard />} />
      <Route path="/task-inbox"       element={<TaskInbox />} />
      <Route path="/purchase-task-inbox" element={<PurchaseTaskInbox />} />
      <Route path="/purchase-order-form" element={<PurchaseOrderForm />} />
      <Route path="/purchase-sof-details" element={<SalesOrderForm />} />
      <Route path="/accounts-team-inbox" element={ph("Task Inbox - Accounts Team")} />
      <Route path="/service-team-inbox"  element={ph("Task Inbox - Service Team")} />
      <Route path="/store-team-inbox"    element={ph("Task Inbox - Store / Operation Team")} />
      <Route path="/hr-team-inbox"       element={ph("Task Inbox - HR Team")} />
      <Route path="/emd-form"         element={<EMDForm />} />
      <Route path="/tracker"          element={ph("Tracker")} />
      <Route path="/tender-tracker"   element={ph("Tender Tracker")} />
      <Route path="/order-tracker"    element={<OrderTracker />} />
      <Route path="/order-edit-form"  element={<OrderEditForm />} />
      <Route path="/emd-bg-tracker"   element={<EMDBGTracker />} />
      <Route path="/reports"          element={ph("Reports")} />
      <Route path="/master-data"      element={ph("Master Data")} />
      <Route path="/settings"         element={ph("Settings")} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
