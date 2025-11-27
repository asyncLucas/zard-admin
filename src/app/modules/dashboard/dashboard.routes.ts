import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard.page').then(c => c.DashboardComponent)
  }
];