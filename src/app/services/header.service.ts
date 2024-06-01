import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  clearSelection$ = new BehaviorSubject<boolean>(false);
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  apiUrl=environment.apiUrl + "/api/Header";
  dialogRef: any;
  constructor(private http: HttpClient) { }

  GetChatAll(payload){
    return this.http.post(`${this.apiUrl}/GetChatAll`,
    payload,
    this.options
    );
  }

  GetChatHistory(payload){
    return this.http.get(`${this.apiUrl}/GetChatHistory/${payload.chatUserId}/${payload.phone}`,
    this.options
    );
  }

  searchContacts(payload){
    return this.http.get(`${this.apiUrl}/searchContacts?searchText=${payload.searchText}&IsFromChat=${payload.IsFromChat}&IsOnlyMember=${payload.IsOnlyMember}`,this.options
    );
  }

  getHelpUsers(){
    return this.http.get(`${this.apiUrl}/getHelpUsers`,
    this.options
    );
  }

  getAlert(payload){
    return this.http.post(`${this.apiUrl}/notification/alert`,
    payload,this.options
    );
  }

  getDispatchBooks(){
    return this.http.get(`${this.apiUrl}/getDispatchBooks`,
    this.options
    );
  }

  getAllImportantNumbers(payload){
    return this.http.post(`${this.apiUrl}/getAllImportantNumbers`,payload,this.options
    );
  }

  getEffectiveDispatchNotifications(){
    return this.http.get(`${this.apiUrl}/getEffectiveDispatchNotifications`,
    this.options
    );
  }

  getAllImportantNumberCategories(){
    return this.http.get(`${this.apiUrl}/getAllImportantNumberCategories`,
    this.options
    );
  }

  searchHospitals(payload){
    return this.http.get(`${this.apiUrl}/searchHospitals?searchText=${payload.searchText}`,
    this.options
    );
  }

  saveDispatchNotification(payload){
    return this.http.post(`${this.apiUrl}/saveDispatchNotification`,
    payload,
    this.options
    );
  }
  deleteDispatchNotification(payload){
    return this.http.post(`${this.apiUrl}/deleteDispatchNotification?id=${payload.id}`,
    this.options
    );
  }
  GetAll(){
    return this.http.get(`${this.apiUrl}/GetAllExpertises`,
    this.options
    );
  }

  getLoggedInUsers(){
    return this.http.get(`${this.apiUrl}/getLoggedInUsers`,
    this.options
    );
  }

  alert(payload){
    return this.http.post(`${this.apiUrl}/notification/alert`,
    payload,
    this.options
    );
  }

  addchat(payload){
    return this.http.post(`${this.apiUrl}/addchat`,
    payload,
    this.options
    );
  }

  updateLogoutTime(payload){
    return this.http.post(`${this.apiUrl}/updateLogoutTime?loggedInUserId=${payload.loggedInUserId}`,
    this.options
    );
  }
}
