import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvestmentDashboardComponent } from './dashboard/investment-dashboard.component';
import { MfListComponent } from './mf-list/mf-list.component';
import { MfFormComponent } from './mf-form/mf-form.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StocksFormComponent } from './stocks-form/stocks-form.component';
import { investmentsRoutes } from './investments.routes';

@NgModule({
  imports: [
    InvestmentDashboardComponent,
    MfListComponent,
    MfFormComponent,
    StocksListComponent,
    StocksFormComponent,
    CommonModule,
    RouterModule.forChild(investmentsRoutes)
  ]
})
export class InvestmentsModule {}
