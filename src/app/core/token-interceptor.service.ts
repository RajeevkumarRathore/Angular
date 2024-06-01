import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpContextToken } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../common-components/snackbar/snackbar.component";

export const HIDE_ERROR_NOTIFICATIONS = new HttpContextToken<boolean>(() => false);


@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar:MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const tokenInfo = this.authService.getTokenInfo();
     if (tokenInfo) {
       request = request.clone({
         setHeaders: {
           Authorization: `Bearer ${tokenInfo.token}`,
         },
       });
     }

    return next.handle(request).pipe(

      tap({
        next: (event: HttpEvent<any>) => {},
        error: (err) => {
          if (!request.context.get(HIDE_ERROR_NOTIFICATIONS)) {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 500 || err.status === 403) {
                // this.snackBar.openFromComponent(SnackbarComponent,
                //     {
                //       duration: 9000,
                //       horizontalPosition: 'center',
                //       data: {
                //         title: 'Operation unsuccessful, please try again.',
                //         action: 'Dismiss',
                //           type: 'snackbar-error',
                //       },
                //     }
                // );
              }
              if (err.status === 400) {
                if (err.error) {
                  this.snackBar.openFromComponent(SnackbarComponent,
                      {
                        duration: 9000,
                        horizontalPosition: 'center',
                        data: {
                          title: err.error.error ? err.error.error[0] : err.error.message,
                          action: 'Dismiss',
                            type: 'snackbar-error',
                        },
                      }
                  );
                }
              }
              if (err.status === 502) {
                this.snackBar.openFromComponent(SnackbarComponent,
                    {
                      duration: 9000,
                      horizontalPosition: 'center',
                      data: {
                        title: 'Error 502, please try again.',
                        action: 'Dismiss',
                          type: 'snackbar-error',
                      },
                    }
                );
              }

              if (err.status === 401) {
                this.authService.logOut();
                if (
                  !this.activatedRoute.snapshot["_routerState"].url.includes(
                    "account/login"
                  )
                ) {
                  this.router.navigate(["account/login"], {
                    queryParams: {
                      returnUrl: this.activatedRoute.snapshot["_routerState"].url,
                    },
                  });
                }
              }
            }
          }
        }
      })
    );
  }
}
