// ─── Dashboard Service ─────────────────────────────────────────────────────────
// Single integration point for all dashboard data.
// To connect the real backend, replace each Promise.resolve() with the
// corresponding API call, e.g.:
//   export const getKpiCards = () => apiClient.get("/dashboard/kpi");
// Nothing else in the codebase needs to change.

import {
  KPI_CARDS,
  KANBAN_COLUMNS,
  NOTIFICATIONS,
  VIEW_ALL_ROWS,
} from "./mockData";

export const getKpiCards = () =>
  Promise.resolve(KPI_CARDS);

// count is derived here so the badge always reflects the true number of cards
// shown. When paginating, the API will return its own authoritative total.
export const getKanbanColumns = () =>
  Promise.resolve(
    KANBAN_COLUMNS.map(col => ({ ...col, count: col.cards.length }))
  );

export const getNotifications = () =>
  Promise.resolve(NOTIFICATIONS);

export const getViewAllRows = columnId =>
  Promise.resolve(VIEW_ALL_ROWS[columnId] ?? []);
