import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface InsurancePayload {
  user_id: number;
  insured_member_id: number;
  policy_name: string;
  policy_type: string;
  insurer?: string;
  policy_number?: string;
  premium_amount?: number;
  premium_frequency: string;
  sum_assured?: number;
  start_date?: string; // YYYY-MM-DD
  next_premium_due_date?: string;
  maturity_date?: string;
  lead_days?: number;
  grace_days?: number;
  auto_debit?: boolean;
  policy_status?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
    private readonly BASE_URL = `${environment.apiBaseUrl}/insurance`;
    private readonly LIST_URL = `/list`;
    private readonly CREATE_URL = `/create`;
    private readonly MEMBERS_URL = `${environment.apiBaseUrl}/members`;

    constructor(private readonly http: HttpClient) {}

    public getInsurancePolicies(): Observable<any> {
        return this.http.get(this.BASE_URL+this.LIST_URL, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).pipe(
            tap(response => {
                return response;
            }),
            catchError(error => {
                console.error('Failed to fetch insurance policies', error);
                throw new Error('Failed to fetch insurance policies');
            })
        )
    }

    createPolicy(payload: InsurancePayload): Observable<any> {
        return this.http.post(this.BASE_URL+this.CREATE_URL, payload);
    }

    updatePolicy(policyId: number, updates: Partial<InsurancePayload>): Observable<any> {
        return this.http.put(`${this.BASE_URL}/${policyId}`, updates);
    }

    getPolicy(policyId: number): Observable<any> {
        return this.http.get(`${this.BASE_URL}/${policyId}`);
    }

    // optional: fetch members for dropdown
    getMembers(): Observable<any> {
        return this.http.get(this.MEMBERS_URL);
    }
}