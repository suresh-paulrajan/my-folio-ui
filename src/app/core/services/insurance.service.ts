import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
    private readonly apiUrl = `${environment.apiBaseUrl}/insurance/list`;

    constructor(private readonly http: HttpClient) {}

    public getInsurancePolicies(): Observable<any> {
        return this.http.get(this.apiUrl, {
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
}