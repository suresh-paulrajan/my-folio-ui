import { Routes } from '@angular/router';
import { InvestmentDashboardComponent } from './dashboard/investment-dashboard.component';
import { MfListComponent } from './mf-list/mf-list.component';
import { MfFormComponent } from './mf-form/mf-form.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StocksFormComponent } from './stocks-form/stocks-form.component';

export const investmentsRoutes: Routes = [
  { path: 'dashboard', component: InvestmentDashboardComponent },
  { path: 'mf-list', component: MfListComponent },
  { path: 'mf-form', component: MfFormComponent },
  { path: 'stocks-list', component: StocksListComponent },
  { path: 'stocks-form', component: StocksFormComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
