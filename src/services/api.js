    // src/services/api.js
import { KANBAN_COLUMNS, KPI_CARDS } from './mockData';

export const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        kanban: KANBAN_COLUMNS, 
        kpis: KPI_CARDS 
      });
    }, 600); // 600ms delay to simulate network
  });
};