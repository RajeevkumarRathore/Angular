import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})

export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    if (this.authService.isLoggedIn()) {
      var user = this.authService.getUserInfo();
      return true;
    } else {
      this.router.navigate(["/account/login"]);
      return false;
    }
  }


}

