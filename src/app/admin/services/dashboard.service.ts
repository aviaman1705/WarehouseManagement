import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardUrl: string = `${environment.apiUrl}dashboard`;
  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Dashboard> {
    var requestHeaders = new HttpHeaders();
    requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    return this.httpClient.get<Dashboard>(`${this.dashboardUrl}`, { headers: requestHeaders, responseType: "json" });
  }

}
