// ─── useDashboard ─────────────────────────────────────────────────────────────
// Fetches all dashboard data through the service layer and exposes loading /
// error states so components never import from mockData directly.

import { useState, useEffect } from "react";
import {
  getKpiCards,
  getKanbanColumns,
  getNotifications,
} from "../services/dashboardService";

const INITIAL_STATE = {
  kpiCards:      [],
  columns:       [],
  notifications: [],
  loading:       true,
  error:         null,
};

export const useDashboard = () => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    Promise.all([getKpiCards(), getKanbanColumns(), getNotifications()])
      .then(([kpiCards, columns, notifications]) => {
        setState({ kpiCards, columns, notifications, loading: false, error: null });
      })
      .catch(err => {
        setState(s => ({
          ...s,
          loading: false,
          error: err?.message ?? "Failed to load dashboard data",
        }));
      });
  }, []);

  return state;
};
