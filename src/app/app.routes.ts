
import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Always show login page by default
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  // Protected routes
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'insurance',
        loadChildren: () =>
          import('./features/insurance/insurance.module').then(m => m.InsuranceModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  // catch-all
  { path: '**', redirectTo: 'login' }
];