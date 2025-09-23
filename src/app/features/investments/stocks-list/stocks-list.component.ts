import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss'],
  imports: [TableModule, ButtonModule]
})
export class StocksListComponent {
  stocks = [
    {
      name: 'Aarti Industries',
      demat: '',
      rating: 2,
      lastPrice: 386.55,
      lastPriceDate: '23-SEP',
      dayChange: -43,
      dayChangePct: -0.78,
      totalCost: 6782,
      costPerShare: 484.45,
      currentValue: 5412,
      shares: 14,
      portfolioPct: 0.22,
      totalReturn: -2218,
      returnPct: null
    },
    // ...add other stocks as needed
  ];
}
