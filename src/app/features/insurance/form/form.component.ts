// src/app/features/insurance/insurance-form/insurance-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceService } from '../../../core/services/insurance.service';
import { finalize } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';

function minNumberValidator(min: number): ValidatorFn {
  return (control: AbstractControl) => {
    const v = control.value;
    if (v == null || v === '') return null;
    const n = Number(v);
    if (isNaN(n) || n < min) return { minNumber: { requiredMin: min } };
    return null;
  };
}

function dateOrderValidator(startKey: string, endKey: string) : ValidatorFn {
  return (group: AbstractControl) => {
    const start = group.get(startKey)?.value;
    const end = group.get(endKey)?.value;
    if (!start || !end) return null;
    const d1 = new Date(start);
    const d2 = new Date(end);
    return d2 >= d1 ? null : { dateOrder: { startKey, endKey } };
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    SelectModule, 
    CheckboxModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    TextareaModule,
  ]
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  isEdit = false;
  policyId?: number;
  serverError?: string;

  // enums
  policyTypes = ['TERM','HEALTH','PERSONAL','AUTO','TOPUP','OTHERS'];
  premiumFrequencies = ['MONTHLY','QUARTERLY','HALFYEARLY','YEARLY','SINGLE'];
  policyStatuses = ['ACTIVE','LAPSED','SURRENDERED','MATURED'];

  // If you want to allow selecting insured_member from list, fetch members here
  members: Array<{ member_id: number, name: string }> = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly svc: InsuranceService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    // optionally fetch members for dropdown
    this.loadMembers();

    // route param for edit
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      if (id) {
        this.isEdit = true;
        this.policyId = Number(id);
        this.loadPolicy(this.policyId);
      } else {
        this.isEdit = false;
      }
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      user_id: [null, Validators.required],
      insured_member_id: [null, Validators.required],
      policy_name: ['', [Validators.required, Validators.maxLength(255)]],
      policy_type: ['', Validators.required],
      insurer: [''],
      policy_number: [''],
      premium_amount: [null, minNumberValidator(0)],
      premium_frequency: ['', Validators.required],
      sum_assured: [null, minNumberValidator(0)],
      start_date: [null],
      next_premium_due_date: [null],
      maturity_date: [null],
      lead_days: [7, [Validators.min(0)]],
      grace_days: [15, [Validators.min(0)]],
      auto_debit: [false],
      policy_status: ['ACTIVE', Validators.required],
      notes: ['']
    }, {
      validators: [
        dateOrderValidator('start_date', 'next_premium_due_date'),
        dateOrderValidator('start_date', 'maturity_date')
      ]
    });
  }

  private loadMembers() {
    // placeholder: replace with actual members API call if you have one
    // this.svc.getMembers().subscribe(m => this.members = m);
    // For now, if user wants prefilled test data (remove in prod)
    this.members = [{ member_id: 1, name: 'Self' }, { member_id: 2, name: 'Spouse' }];
  }

  private loadPolicy(id: number) {
    this.loading = true;
    this.svc.getPolicy(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (p) => {
          // patch form with server data (convert ISO date strings to yyyy-mm-dd if needed)
          const patch = { ...p } as any;
          // ensure date fields are YYYY-MM-DD for input[type=date]
          ['start_date','next_premium_due_date','maturity_date'].forEach(k => {
            if (patch[k]) {
              patch[k] = patch[k].slice(0,10);
            }
          });
          this.form.patchValue(patch);
        },
        error: (err) => {
          console.error(err);
          this.serverError = 'Failed to load policy, please try again.';
        }
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.serverError = undefined;
    const payload = this.preparePayload();

    this.loading = true;
    if (this.isEdit && this.policyId) {
      this.svc.updatePolicy(this.policyId, payload).pipe(finalize(()=>this.loading=false)).subscribe({
        next: () => this.router.navigate(['/policies']),
        error: (err) => {
          console.error(err);
          this.serverError = err?.error?.detail || 'Update failed';
        }
      });
    } else {
      this.svc.createPolicy(payload).pipe(finalize(()=>this.loading=false)).subscribe({
        next: () => this.router.navigate(['/policies']),
        error: (err) => {
          console.error(err);
          this.serverError = err?.error?.detail || 'Create failed';
        }
      });
    }
  }

  private preparePayload() {
    // return form value as-is. Adjust conversions if your API expects datetimes or numbers.
    const raw = { ...this.form.value };

    // ensure numeric fields are numbers
    ['user_id','insured_member_id','lead_days','grace_days'].forEach(k => {
      if (raw[k] !== null && raw[k] !== undefined) raw[k] = Number(raw[k]);
    });
    // premium_amount & sum_assured to numbers
    if (raw.premium_amount !== null && raw.premium_amount !== undefined) raw.premium_amount = Number(raw.premium_amount);
    if (raw.sum_assured !== null && raw.sum_assured !== undefined) raw.sum_assured = Number(raw.sum_assured);

    // If APIs expect ISO date strings, the input[type=date] already sends YYYY-MM-DD which is fine.
    return raw;
  }

  onCancel() {
    this.router.navigate(['/insurance']);
  }

  // helpers for template
  hasError(controlName: string, errName?: string) {
    const c = this.form.get(controlName);
    if (!c) return false;
    if (errName) return c.hasError(errName) && (c.touched || c.dirty);
    return c.invalid && (c.touched || c.dirty);
  }
}