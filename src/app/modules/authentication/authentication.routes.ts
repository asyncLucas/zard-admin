import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: 'sign-in',
    loadComponent: () => import('./authentication.page').then(m => m.AuthenticationComponent),
  },
];