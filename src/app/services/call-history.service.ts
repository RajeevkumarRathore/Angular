import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AgGridRequestService } from './ag-grid-request.service';
@Injectable({
  providedIn: 'root'
})
export class CallHistoryService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  private callHistoryUrl = environment.apiUrl +'/api/CallHistory';

  constructor(private http: HttpClient,
    private agGridRequestService: AgGridRequestService) { }

  public getMemberCallHistoryReport(payload) {
    return this.http.post(`${this.callHistoryUrl}/GetMemberCallHistoryReport`, payload, this.options)
  }

  public getMemberCallHistoryReportByBadge(payload) {
    return this.http.post(`${this.callHistoryUrl}/getMemberCallHistoryReportByBadge`, payload, this.options)

  }

  public restoreCallToPreviousStatus(payload) {
    return this.http.get(`${this.callHistoryUrl}/restoreCallToPreviousStatus?clientId=${payload.clientId}`, this.options)

  }

  public GetCallHistoryDetail(payload) {
    return this.http.get(`${this.callHistoryUrl}/GetCallHistoryDetail?clientId=${payload.id}`, this.options)
  }

  public changeMemberType(payload) {
    return this.http.post(`${this.callHistoryUrl}/ChangeMemberType?clientId=${payload.clientId}&memberId=${payload.memberId}&type=${payload.type}&isNotificationTemporarySwitchOn=${payload.isNotificationTemporarySwitchOn}&checkedStatus=${payload.checkedStatus}`, this.options)
  }

  public getClientActivityLogs(payload) {
    return this.http.post(`${this.callHistoryUrl}/getClientActivityLogs?clientId=${payload.clientId}`, this.options)
  }

  public getCallHistoryNotes(payload) {
    return this.http.post(`${this.callHistoryUrl}/getCallHistoryNotes?clientId=${payload.clientId}`, this.options)
  }

  public addCallHistoryNote(payload) {
    return this.http.post(`${this.callHistoryUrl}/addCallHistoryNote`,payload, this.options)
  }

  public GetCallHistoryCounts() {
    return this.http.get(`${this.callHistoryUrl}/GetCallHistoryCounts`, this.options)
  }


  public GetCallHistory(body,columnDefs,memberReportViewModel,globalSearch?){
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
    return this.http.post(`${this.callHistoryUrl}/GetCallHistory`,payload,this.options);
  }


}
