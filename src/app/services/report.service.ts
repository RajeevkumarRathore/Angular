import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AgGridRequestService } from './ag-grid-request.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  private memberUrl = environment.apiUrl + "/api/report";
  selectedDate$: ReplaySubject<any> = new ReplaySubject(1);
  selectedRange$: ReplaySubject<any> = new ReplaySubject();
  selectedMonthAndYear$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,
    private agGridRequestService: AgGridRequestService
    ) { }

   public getMembersReportByDateRange(body,columnDefs,memberReportViewModel,globalSearch?){
    const filters = {}
    let commonRequest: any = this.agGridRequestService.transformAgGridRequest(
      body,
      columnDefs,
      globalSearch,
      filters
    );
    let payload :any = {
      ...commonRequest,
      ...memberReportViewModel
    }
    return this.http.post(`${this.memberUrl}/getMembersReportByDateRange`,payload,this.options);
  }

 public getMembersSummaryForReport(body,columnDefs,membersSummaryReportViewModel,globalSearch?){
    const filters = {}
    let commonRequest: any = this.agGridRequestService.transformAgGridRequest(
      body,
      columnDefs,
      globalSearch,
      filters
    );
    let payload :any = {
      ...commonRequest,
      ...membersSummaryReportViewModel
    }
    return this.http.post(`${this.memberUrl}/getMembersSummaryForReport`,payload,this.options);
  }

  public GetCallHistoryDetail(payload) {
    return this.http.get(`${this.memberUrl}/GetCallHistoryDetail?clientId=${payload.id}`, this.options)
  }

  public getClientActivityLogs(payload) {
    return this.http.post(`${this.memberUrl}/getClientActivityLogs?clientId=${payload.clientId}`, this.options)
  }

  public getCallHistoryNotes(payload) {
    return this.http.post(`${this.memberUrl}/getCallHistoryNotes?clientId=${payload.clientId}`, this.options)
  }

  public addCallHistoryNote(payload) {
    return this.http.post(`${this.memberUrl}/addCallHistoryNote`,payload, this.options)
  }
  
  public changeMemberType(payload) {
    return this.http.post(`${this.memberUrl}/changeMemberType?clientId=${payload.clientId}&memberId=${payload.memberId}&type=${payload.type}&isNotificationTemporarySwitchOn=${payload.isNotificationTemporarySwitchOn}&checkedStatus=${payload.checkedStatus}`, this.options)
  }

  public SendThankyouMessageToAll(payload) {
    return this.http.post(`${this.memberUrl}/sendThankyouMessageToAll`,payload, this.options)
  }

  public sendThankyouMessage(payload) {
    return this.http.post(`${this.memberUrl}/sendThankyouMessage`,payload, this.options)
  } 

  public getNightCallTimesSettings() {
    return this.http.get(`${this.memberUrl}/getNightCallTimesSettings`, this.options)
  }
  public updateNightCallTimesSettings(payload) {
    return this.http.post(`${this.memberUrl}/updateNightCallTimesSettings`,payload, this.options)
  }
}
