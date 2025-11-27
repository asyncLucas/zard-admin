import { Routes } from '@angular/router';
import { UserProfilePageComponent } from './modules/profile/profile.page';
import { SettingsPage } from './modules/settings/settings.page';
import { PlansComponent } from './modules/mind-maps/plans/plans.component';
import { TestingComponent } from './modules/testing/testing/testing.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/layout-full.component').then(
        (m) => m.LayoutFullComponent
      ),
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes').then(
            (m) => m.ROUTES
          ),
      },
      {
        path: 'transactions',
        title: 'Transactions',
        loadChildren: () =>
          import('./modules/transactions/transactions.routes').then(
            (m) => m.ROUTES
          ),
      },
      {
        path: 'mind-maps',
        title: 'Mind Maps',
        component: PlansComponent
      },
      {
        path: 'profile',
        title: 'Profile',
        component: UserProfilePageComponent
      },
      {
        path: 'settings',
        title: 'Settings',
        component: SettingsPage
      },
      {
        path: 'testing',
        title: 'Testing',
        component: TestingComponent
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.routes').then(
        (m) => m.ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
