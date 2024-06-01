import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgGridRequestService } from './ag-grid-request.service';
import { environment } from 'src/environments/environments';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  refreshMemberDetail$: Subject<any> = new Subject<any>();
  showCallHistoryDetail$: Subject<any> = new Subject<any>();
  sendMemberDetailtoSidebar$= new BehaviorSubject<any>({});
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  private memberUrl = environment.apiUrl + "/api/Member";

  constructor(private http: HttpClient,
    private agGridRequestService: AgGridRequestService
    ) { }


  public GetMembers(body,columnDefs,memberReportViewModel,globalSearch?){
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
    return this.http.post(`${this.memberUrl}/GetAllMembers`,payload,this.options);
  }

  getMemberCounts(){
    return this.http.get(`${this.memberUrl}/getMemberCounts`,this.options);
  }

  updateIsDispatcher(payload){
    return this.http.post(`${this.memberUrl}/updateIsDispatcher?user_id=${payload.user_id}&isDispatcher=${payload.isDispatcher}`,this.options);
  }

  updateIsBus(payload){
    return this.http.post(`${this.memberUrl}/updateIsBus?user_id=${payload.user_id}&isBus=${payload.isBus}`,this.options);
  }

  updateIsBase(payload){
    return this.http.post(`${this.memberUrl}/updateIsBase?user_id=${payload.user_id}&isBase=${payload.isBase}`,this.options);
  }

  updateIsNsUnit(payload){
    return this.http.post(`${this.memberUrl}/updateIsNsUnit?user_id=${payload.user_id}&isNsUnit=${payload.isNsUnit}`,this.options);
  }

  deleteMember(payload){
    return this.http.get(`${this.memberUrl}/deleteMember?user_id=${payload.user_id}`,this.options);
  }

  updateCallTextOnOffStatus(payload){
    return this.http.post(`${this.memberUrl}/updateCallTextOnOffStatus`,payload,this.options);
  }

  getCallTextOnOffStatus(){
    return this.http.get(`${this.memberUrl}/getCallTextOnOffStatus`,this.options);
  }

  getNotificationsOnOffStatus(){
    return this.http.get(`${this.memberUrl}/getNotificationsOnOffStatus`,this.options);
  }

  updateGeneralNotificationsOnOffStatus(payload){
    return this.http.post(`${this.memberUrl}/updateGeneralNotificationsOnOffStatus`,payload,this.options);
  }

  addPhoneToMember(payload){
    return this.http.post(`${this.memberUrl}/addPhoneToMember`,payload,this.options);
  }

  deleteMemberPhone(payload){
    return this.http.post(`${this.memberUrl}/deleteMemberPhone?memberPhoneId=${payload.memberPhoneId}`,this.options);
  }

  editMemberPhoneNumber(payload){
    return this.http.post(`${this.memberUrl}/editMemberPhoneNumber`,payload,this.options);
  }

  updateSwitchStatusOfMemberPhone(payload){
    return this.http.post(`${this.memberUrl}/updateSwitchStatusOfMemberPhone`,payload,this.options);
  }


  expertisesUpdate(payload){
    return this.http.post(`${this.memberUrl}/expertisesUpdate`,payload,this.options);
  }

  getMemberCallHistory(payload){
    return this.http.post(`${this.memberUrl}/getMemberCallHistory`,payload,this.options);
  }

  getSettingByUserId(payload){
    return this.http.get(`${this.memberUrl}/getSettingByUserId?user_id=${payload.userId}`,this.options);
  }


  updateIsReceivingPhoneCalls(payload){
    return this.http.post(`${this.memberUrl}/updateIsReceivingPhoneCalls?user_id=${payload.user_id}&isReceivingPhoneCalls=${payload.isReceivingPhoneCalls}`,this.options);
  }

  updateIsTakingShifts(payload){
    return this.http.post(`${this.memberUrl}/updateIsTakingShifts?user_id=${payload.user_id}&isTakingShifts=${payload.isTakingShifts}`,this.options);
  }

  getMemberMappedRadios(payload){
    return this.http.post(`${this.memberUrl}/getMemberMappedRadios`,payload,this.options);
  }

  deleteMemberRadioMapping(payload){
    return this.http.post(`${this.memberUrl}/deleteMemberRadioMapping`,payload,this.options);
  }

  createMember(payload){
    return this.http.post(`${this.memberUrl}/createMember`,payload ,this.options);
  }

  addRadioToMember(payload){
    return this.http.post(`${this.memberUrl}/addRadioToMember`,payload ,this.options);
  }

  GetContactInfoByUserId(payload){
    return this.http.get(`${this.memberUrl}/GetContactInfoByUserId?user_id=${payload.user_id}` ,this.options)
  }
}
