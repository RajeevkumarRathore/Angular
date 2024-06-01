import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  selectedDate$: ReplaySubject<any> = new ReplaySubject(1);
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };      
  apiUrl=environment.apiUrl+'/api/dashboard'

  constructor(private http: HttpClient) { }

  pcrDetails(payload){
    return this.http.get(`${this.apiUrl}/pcrDetails?startDate=${payload.startDate}&endDate=${payload.endDate}`,this.options
    );
  }

  hospitalDetails(payload){
    return this.http.get(`${this.apiUrl}/hospitalDetails?startDate=${payload.startDate}&endDate=${payload.endDate}`,
    this.options
    );
  }

  natureOfCallsDetails(payload){
    return this.http.get(`${this.apiUrl}/natureOfCallsDetails?startDate=${payload.startDate}&endDate=${payload.endDate}`,
    this.options
    );
  }

  CallsTypeDetails(payload){
    return this.http.get(`${this.apiUrl}/CallsTypeDetails?startDate=${payload.startDate}&endDate=${payload.endDate}`,
    this.options
    );
  }

  GetMembersTopResponderReport(payload){
    return this.http.post(`${this.apiUrl}/GetMembersTopResponderReport`,
    payload,
    this.options
    );
  }

  GetCallVolumeDetails(payload){
    return this.http.get(`${this.apiUrl}/GetCallVolumeDetails?startDate=${payload.startDate}&endDate=${payload.endDate}`,
    this.options
    );
  }

  GetNightShiftDetails(payload){
    return this.http.get(`${this.apiUrl}/GetNightShiftDetails?todayDate=${payload.todayDate}`,
    this.options
    );
  }

  GetPcrSummaryDetails(payload){
    return this.http.get(`${this.apiUrl}/GetPcrSummaryDetails?startDate=${payload.startDate}&endDate=${payload.endDate}`,
    this.options
    );
  }
  GetReportDashboardCountsByDate(payload){
    return this.http.get(`${this.apiUrl}/GetReportDashboardCountsByDate?reportDate=${payload.reportDate}`,
    this.options
    );
  }
  GetOpenCompletedPcrByBadgeNumber(payload){
    return this.http.get(`${this.apiUrl}/GetOpenCompletedPcrByBadgeNumber?badgeNumber=${payload.badgeNumber}&isOpenPcr=${payload.isOpenPcr}`,
    this.options
    );
  }
}
