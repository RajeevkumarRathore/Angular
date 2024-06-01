import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridRequestService } from './ag-grid-request.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  private contactUrl = environment.apiUrl +"/api/Contact";

  constructor(private http: HttpClient,
    private agGridRequestService:AgGridRequestService) { }




  

  public createContact(payload){
    return this.http.post(`${this.contactUrl}/CreateUpdateContact`,payload,this.options)
  }
  public getAllContact(body,columnDefs?,memberReportViewModel?,globalSearch?){
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
    return this.http.post(`${this.contactUrl}/getAllContact`,payload,this.options);
  }
}
