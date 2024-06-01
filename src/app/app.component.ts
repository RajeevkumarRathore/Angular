import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'test';
  isHeaderVisable: boolean;
  parentRouteName: string;
  constructor(
    private location: Location,
    public router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        this.parentRouteName = event.snapshot.url.length
          ? event.snapshot.url[0].path
          : "empty";
        if (
          this.parentRouteName === "account" ||
          this.parentRouteName === "login"
        ) {
          this.isHeaderVisable = false;
        } else {
          this.isHeaderVisable = true;
        }
      }
    });
    if (this.location.path() === '/' || this.location.path() === '') {
      this.router.navigate(["/account/login"]);
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}


}
