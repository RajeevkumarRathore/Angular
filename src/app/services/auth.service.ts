import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { StorageKeyEnum } from '../core/StorageKeyEnum';
import { LoginModel, TokenInfo, UserInfo } from '../models/login.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userInfo$ = new BehaviorSubject<LoginModel>({data: {
      tokens : this.getTokenInfo(),
      userInfoDto:this.getUserInfo()
    }
  });
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  locationObs$ = new BehaviorSubject(null);
  apiUrl=environment.apiUrl + "/api/Authorize";

  constructor(private http: HttpClient,
    public router: Router) { }

  public login(username: string, password: string) {
    const data = JSON.stringify({ username, password });
    return this.http.post(`${this.apiUrl}/GetTokenByUsername`, data, this.options).pipe(
      tap((usr: any) => {
        this.userInfo$.next(usr);
      })
    );
  }

  public getUserInfo(): UserInfo {
    const userData = JSON.parse(
      localStorage.getItem(StorageKeyEnum.User)
    ) as UserInfo;
    if (userData) {
      return userData;
    } else {
      return null;
    }
  }

  public getTokenInfo(): TokenInfo {
    const tokenData = JSON.parse(
      localStorage.getItem(StorageKeyEnum.TokenInfo)
    ) as TokenInfo;
    if (tokenData) {
      return tokenData;
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(StorageKeyEnum.User);
  }

  public logOut() {
    this.router.navigate(['/account/login'])
    localStorage.clear();
    localStorage.removeItem(StorageKeyEnum.User);
    localStorage.removeItem(StorageKeyEnum.TokenInfo);
  }

  
  public checkUsernameAndPhone(payload) {
    return this.http.post(`${this.apiUrl}/checkUsernameAndPhone`,payload, this.options)
  }

  public checkOTP(payload) {
    return this.http.post(`${this.apiUrl}/checkOTP`,payload, this.options)
  }

  public updatePassword(payload) {
    return this.http.post(`${this.apiUrl}/updatePassword`,payload, this.options)
  }
  
}
