import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InsuranceService } from '../../../core/services/insurance.service';

@Component({
  selector: 'app-list',
  imports: [TableModule, TagModule, DatePipe, CurrencyPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  constructor(private readonly insuranceService: InsuranceService) { }
  
  insuranceList : any = [];
  ngOnInit() {
    this.insuranceService.getInsurancePolicies().subscribe({
      next: (response) => {
        this.insuranceList = response;
      },
      error: (error) => {
        console.error('Error fetching insurance policies', error);
      }
    });
  }

  editPolicy(policy: any) {
    // Navigate to edit page with policy details
  }

  deletePolicy(policyId: number) {
    // Call API to delete policy and refresh list
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'ACTIVE':
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
      case 'HEALTH':
        return 'info';
      case 'TERM':
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
