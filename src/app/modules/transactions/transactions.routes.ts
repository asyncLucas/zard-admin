import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./list/list.page').then(m => m.ListTransactionsPage),
  },
];