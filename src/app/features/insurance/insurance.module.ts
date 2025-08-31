import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { InsuranceRoutingModule } from './insurance-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    InsuranceRoutingModule, 
    ListComponent, 
    FormComponent]
})
export class InsuranceModule {}