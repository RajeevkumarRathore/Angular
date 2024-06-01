import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ShiftScheduleService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  private shiftScheduleUrl = environment.apiUrl + '/api/ShiftSchedule';
  weekDaysDe: string[] = [ 'Is Weekly ?', 'Is BiWeekly ?', 'Is Every 3 Weeks ?', 'Is Every 4 Weeks ?', 'Is Every 5 Weeks ?', 'Is Every 6 Weeks ?', 'Is Every 7 Weeks ?','Is Every 8 Weeks ?'];
  isSpinner: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getAllColumnStates(){
    return this.http.get(`${this.shiftScheduleUrl}/GetAllColumnStates`)
  }


  getShiftSchedulePlanData(payload){
    return this.http.get(`${this.shiftScheduleUrl}/GetShiftSchedulePlanData?shiftTypeId=${payload.shiftTypeId}`,this.options)
  }

  getShiftScheduleTakeDataAdmin(payload){
return this.http.get(`${this.shiftScheduleUrl}/GetShiftScheduleTakeDataAdmin?shiftTypeId=${payload.shiftTypeId}&scheduleStartDate=${payload.scheduleStartDate}&scheduleEndDate=${payload.scheduleEndDate}`
,this.options)
  }

  getMembersForShiftSchedule(){
    return this.http.get(`${this.shiftScheduleUrl}/GetMembersForShiftSchedule`)
  }

  getAutoDismissCallSettings(){
    return this.http.get(`${this.shiftScheduleUrl}/GetAutoDismissCallSettings`)
  }

  getRequestShiftTypes(){
    return this.http.get(`${this.shiftScheduleUrl}/GetRequestShiftTypes`)
  }

  createShiftSchedule(payload){
  return this.http.post(`${this.shiftScheduleUrl}/CreateShiftSchedule`,payload)
  }

  updateShiftSchedulePlanData(payload){
    return this.http.post(`${this.shiftScheduleUrl}/UpdateShiftSchedulePlanData`,payload)
  }

  softDeleteShiftSchedule(payload){
    return this.http.get(`${this.shiftScheduleUrl}/SoftDeleteShiftSchedule?shiftScheduleId=${payload.shiftScheduleId}`)
  }

  editShiftSchedule(payload){
    return this.http.post(`${this.shiftScheduleUrl}/EditShiftSchedule`,payload,this.options)
  }

  addShiftScheduleTakeFromWeb(payload){
    return this.http.post(`${this.shiftScheduleUrl}/AddShiftScheduleTakeFromWeb`,payload,this.options)
  }

  deleteShiftScheduleFromWeb(payload){
    return this.http.get(`${this.shiftScheduleUrl}/DeleteShiftScheduleFromWeb?shiftScheduleTakeId=${payload.shiftScheduleTakeId}
    &selectedDeleteType=${payload.selectedDeleteType}&dayOfWeek=${payload.dayOfWeek}&loggedInUserId=${payload.loggedInUserId}`)
  }
}



