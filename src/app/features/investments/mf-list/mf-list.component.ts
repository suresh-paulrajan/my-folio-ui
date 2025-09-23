import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mf-list',
  imports: [TableModule, ButtonModule],
  templateUrl: './mf-list.component.html',
  styleUrls: ['./mf-list.component.scss']
})
export class MfListComponent {
  mutualFunds = [
    {
      name: 'Motilal Oswal Midcap Reg-G',
      folio: '910104872902',
      rating: 5,
      lastPrice: 104.86,
      lastPriceDate: '22-SEP',
      dayChange: -152,
      dayChangePct: -0.87,
      totalCost: 15999,
      costPerUnit: 96.85,
      currentValue: 17323,
      units: 165,
      portfolioPct: 0.71,
      totalReturn: 1324,
      returnPct: 22.2
    },
    // ...add other funds as needed
  ];
}
