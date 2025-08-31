import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';

export const routes: Routes = [
    // public/auth routes
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // everything else lives under the shell layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'insurance',
        loadChildren: () =>
          import('./features/insurance/insurance.module').then(m => m.InsuranceModule)
      }
    ]
  },

  // catch-all
  { path: '**', redirectTo: 'dashboard' }
];