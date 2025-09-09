import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CardModule, ChartModule, TableModule, DatePipe, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  portfolioValue: number = 1250000;
  lastUpdated: Date = new Date();

  assetAllocationData: any;
  performanceData: any;
  chartOptions: any;

  insurancePolicies = [
    { name: 'HDFC Term Life', type: 'Term', premium: 12000 },
    { name: 'ICICI Health Plus', type: 'Health', premium: 18000 }
  ];

  upcomingActions = [
    { task: 'Pay Health Insurance Renewal', dueDate: new Date(2025, 9, 15) },
    { task: 'Review SIP Allocation', dueDate: new Date(2025, 9, 20) }
  ];

  ngOnInit(): void {
    this.assetAllocationData = {
      labels: ['Equity', 'Debt', 'Gold', 'Others'],
      datasets: [
        {
          data: [55, 25, 10, 10],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']
        }
      ]
    };

    this.performanceData = {
      labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          label: 'Portfolio Value',
          data: [1150000, 1175000, 1190000, 1210000, 1235000, 1250000],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    };
  }
}