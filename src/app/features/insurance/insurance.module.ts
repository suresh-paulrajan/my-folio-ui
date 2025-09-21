import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule, 
    InsuranceRoutingModule, 
    ToastModule,
    ListComponent, 
    FormComponent
  ],
  providers: [MessageService]
})
export class InsuranceModule {}