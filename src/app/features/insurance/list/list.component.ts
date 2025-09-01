import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-list',
  imports: [TableModule, TagModule, DatePipe, CurrencyPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  
  insuranceList : any = [];
  ngOnInit() {
    // Load from API
    this.insuranceList = [{
      id: 1,
      type: 'Health',
      provider: 'Starr',
      policyNumber: 'POL123456',
      insuredName: 'Suresh',
      cover: 1000000,
      premium: 22000,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-01-01'),
      nextDueDate: new Date('2025-10-01'),
      status: 'Active'
    }, {
      id: 2,
      type: 'Term',
      provider: 'Tata AIA',
      policyNumber: 'POL-828394',
      insuredName: 'Pavithra',
      cover: 10000000,
      premium: 25600,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-01-01'),
      nextDueDate: new Date('2025-10-01'),
      status: 'Pending'
    }];
  }

  editPolicy(policy: any) {
    // Navigate to edit page with policy details
  }

  deletePolicy(policyId: number) {
    // Call API to delete policy and refresh list
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'danger';
      case 'Pending':
        return 'warn';
      default:
        return 'info';
    }
  }

  getTypeSeverity(type: string): string {
    switch (type) {
      case 'Health':
        return 'info';
      case 'Life':
        return 'success';
      case 'Auto':
        return 'warning';
      case 'Home':
        return 'primary';
      default:
        return 'secondary';
    }
  }
}
