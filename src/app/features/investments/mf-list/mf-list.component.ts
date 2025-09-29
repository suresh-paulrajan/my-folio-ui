
import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { FieldsetModule } from 'primeng/fieldset';
import { InrPipe } from '../../../shared/utils/inr.pipe';

@Component({
  selector: 'app-mf-list',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TabsModule,
    FieldsetModule,
    InrPipe,
    NgFor, NgIf
  ],
  templateUrl: './mf-list.component.html',
  styleUrls: ['./mf-list.component.scss']
})
export class MfListComponent {
  // Angular pipes for template usage (if needed for standalone components)
  datePipe = new DatePipe('en-US');
  // For demo, using mock data. Replace with API data as needed.
  mutualFunds = [
    {
      fundId: 1,
      fundName: 'Motilal Oswal Midcap Reg-G',
      folioNo: '910104872902',
      nav: 99.53,
      navDate: new Date('2025-09-26'),
      dayChange: -382,
      dayChangePct: -2.27,
      investedValue: 15999,
      avgCost: 96.85,
      currentValue: 16441,
      units: 165,
      portfolioPct: 0.70,
      returnsAbs: 442,
      returnsPct: 7.0,
      rating: 5,
      folios: [
        {
          folioNo: '910104872902',
          nav: 99.53,
          navDate: new Date('2025-09-26'),
          dayChange: -382,
          dayChangePct: -2.27,
          investedValue: 15999,
          avgCost: 96.85,
          currentValue: 16441,
          units: 165,
          portfolioPct: 0.70,
          returnsAbs: 442,
          returnsPct: 7.0,
          goal: 'Retirement',
          goalWeight: 20
        }
      ]
    },
    {
      fundId: 2,
      fundName: 'Parag Parikh Flexi Cap Dir-G',
      folioNo: '123456',
      nav: 92.61,
      navDate: new Date('2025-09-26'),
      dayChange: -1573,
      dayChangePct: -0.61,
      investedValue: 229989,
      avgCost: 82.88,
      currentValue: 256992,
      units: 2775,
      portfolioPct: 10.92,
      returnsAbs: 27003,
      returnsPct: 12.7,
      rating: 5,
      folios: [
        {
          folioNo: '123456',
          nav: 92.61,
          navDate: new Date('2025-09-26'),
          dayChange: -790,
          dayChangePct: -0.61,
          investedValue: 115494,
          avgCost: 82.9,
          currentValue: 129023,
          units: 1393,
          portfolioPct: 5.48,
          returnsAbs: 13529,
          returnsPct: 12.6,
          goal: 'Retirement',
          goalWeight: 13
        },
        {
          folioNo: '234567',
          nav: 92.61,
          navDate: new Date('2025-09-26'),
          dayChange: -783,
          dayChangePct: -0.61,
          investedValue: 114494,
          avgCost: 82.86,
          currentValue: 127969,
          units: 1382,
          portfolioPct: 5.44,
          returnsAbs: 13474,
          returnsPct: 12.7,
          goal: 'Kunaal Education',
          goalWeight: 30
        }
      ]
    }
    // ...add more funds as needed
  ];

  expandedRowKeys: { [key: string]: boolean } = {};

  // Totals for footer
  get totalDayChange(): number {
    return this.mutualFunds.reduce((sum, mf) => sum + (mf.dayChange || 0), 0);
  }
  get totalDayChangePct(): number {
    // Weighted average by current value
    const totalCurrent = this.totalCurrent;
    if (!totalCurrent) return 0;
    return this.mutualFunds.reduce((sum, mf) => sum + ((mf.dayChangePct || 0) * (mf.currentValue || 0)), 0) / totalCurrent;
  }
  get totalInvested(): number {
    return this.mutualFunds.reduce((sum, mf) => sum + (mf.investedValue || 0), 0);
  }
  get totalCurrent(): number {
    return this.mutualFunds.reduce((sum, mf) => sum + (mf.currentValue || 0), 0);
  }
  get totalPortfolioPct(): number {
    return this.mutualFunds.reduce((sum, mf) => sum + (mf.portfolioPct || 0), 0);
  }
  get totalReturnsAbs(): number {
    return this.mutualFunds.reduce((sum, mf) => sum + (mf.returnsAbs || 0), 0);
  }
  get totalReturnsPct(): number {
    // Weighted average by invested value
    const totalInvested = this.totalInvested;
    if (!totalInvested) return 0;
    return this.mutualFunds.reduce((sum, mf) => sum + ((mf.returnsPct || 0) * (mf.investedValue || 0)), 0) / totalInvested;
  }

  mobileSummaryMode = 0; // 0: Current, 1: Total Return, 2: 1 Day Change
  mobileSummaryLabels = ['Current (Invested)', 'Total Return (% P.A.)', '1 day Change (%)'];
  mobileExpanded: { [fundId: number]: boolean } = {};

  mobileSummaryClass() {
    if (this.mobileSummaryMode === 1) return this.totalReturnsAbs > 0 ? 'text-green' : (this.totalReturnsAbs < 0 ? 'text-red' : '');
    if (this.mobileSummaryMode === 2) return this.totalDayChange > 0 ? 'text-green' : (this.totalDayChange < 0 ? 'text-red' : '');
    return '';
  }

  cycleMobileSummary() {
    this.mobileSummaryMode = (this.mobileSummaryMode + 1) % 3;
  }

  getMobileValueClass(row: any) {
    if (this.mobileSummaryMode === 1) return row.returnsAbs > 0 ? 'text-green' : (row.returnsAbs < 0 ? 'text-red' : '');
    if (this.mobileSummaryMode === 2) return row.dayChange > 0 ? 'text-green' : (row.dayChange < 0 ? 'text-red' : '');
    return '';
  }

  toggleMobileExpand(row: any) {
    this.mobileExpanded[row.fundId] = !this.mobileExpanded[row.fundId];
  }
}
