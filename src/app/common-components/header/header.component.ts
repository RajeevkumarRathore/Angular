import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotificationHeaderPopUpComponent } from '../notification-header-pop-up/notification-header-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/services/header.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { ImportantHeaderPopUpComponent } from '../important-header-pop-up/important-header-pop-up.component';
import { HelpHeaderPopUpComponent } from '../help-header-pop-up/help-header-pop-up.component';
import { AlertHeaderPopUpComponent } from '../alert-header-pop-up/alert-header-pop-up.component';
import { DispatchBookHeaderPopUpComponent } from '../dispatch-book-header-pop-up/dispatch-book-header-pop-up.component';
import { CallHistoryService } from 'src/app/services/call-history.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from 'src/environments/environments';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy{
  importantNumbers: any;
  openProfileSideBar: boolean = false;
  dispatchDetail:any;
  helpDetail:any;
  userInfo:any;
  adminSidePanelData: any;
  messageSidePanelData: any;
  menuSidePanelData: any;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  @ViewChild('messageSidenav') public messageSidenav: MatSidenav;
  @ViewChild('menuSideNav') public menuSideNav: MatSidenav;
  @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;
  tokenInfo: any;

  private hubConnection: HubConnection
  private destroy$ = new Subject<void>();
  headerAlertdata: any;
  alertForm: FormGroup;
  notificationData: any[] = [];
  importantNumberCategories: any;
  categoryName: any;
  userData: any;
  searchText: any;
  recognition: any;
  isListening: boolean = false;
  sideBar: string;
  data: any;
  callHistoryDetailData: any;



  constructor(private dialog: MatDialog,
    private headerService: HeaderService,
    private authService:AuthService,
    private sideNavService:SidenavService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private router: Router,
    private callhistoryservice:CallHistoryService
    ){
      this.initializeRecognition();
    }

  ngOnInit(): void {
    this.userInfo =  this.authService.userInfo$.value.data.userInfoDto;
    this.tokenInfo =  this.authService.userInfo$.value.data.tokens;
    this.getEffectiveDispatchNotifications();
    this.sideNavService.sidenavData$
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {

      if(res?.Admin){
        this.adminSidePanelData = res.Admin;
      }else if(res?.Message){
        this.messageSidePanelData = res.Message;
      }else if(res?.Menu){
        this.menuSidePanelData = res.Menu;
      }

    });
      this.alertHeader();
      this.alertForm = this.fb.group({
        message: [null, Validators.required],
        selectedExpertises: [],
      });
      this.router.events.subscribe(event => {
         this.sideNavService.close();
      });
    const connection = (this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        `${environment.apiUrl}/LogoutUsers`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }
      )
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build());

    connection.start().then(() => {
      console.log('Connection started')
    })
    .catch(err => {
      console.log('Error while starting connection: ' + err)
    });

    connection.on("send", (data: PendingProcess) => {
     console.log(data);
    });
  }


  ngOnDestroy(): void {

    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }


  alertHeader() {
    this.headerService.GetAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {

        this.headerAlertdata = res.data;
      },
    });
  }

  sendSms() {
    if (this.alertForm.valid) {
    const payload={
      alertMessageType: 1,
      clickedButton: "btnSendAlertNotificationSms",
      loggedInUserId: this.authService.userInfo$.value.data.tokens.userID,
      message: this.alertForm.controls['message'].value,
      selectedExpertises: this.alertForm.controls['selectedExpertises'].value
    }
    this.headerService.alert(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
          this.alertForm.get('message').setValue(null);
          this.snackBar.openFromComponent(SnackbarComponent,
          {
            duration: 3000,
            horizontalPosition: 'start',
            data: {
              title: res.message,
              action: 'Dismiss',
              type: 'snackbar-success',
            },
          }
        );
      },

    });
    }
    else {
      this.snackBar.openFromComponent(SnackbarComponent,
        {
          duration: 3000,
          horizontalPosition: 'start',
          data: {
            title:'Warning! Alert Message cannot be empty',
            action: 'Dismiss',
            type: 'snackbar-warning',
          },
        }
    );

    }
  }

  openNotificationsDialog() {
    this.dialog
      .open(NotificationHeaderPopUpComponent, {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop:true,
        width: '600px',
      })
      .afterClosed()
      .subscribe((res: any) => {
        this.getEffectiveDispatchNotifications()
      });
  }

  getLoggedInUsers() {
    this.headerService.getLoggedInUsers().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.userData = res.data;
        this.sideNavService.setSidenav(this.sidenav);
        if (this.tokenInfo.userID) {
          var itemId=this.tokenInfo.userID;
           this.sideNavService.openSidePanel({Admin: itemId});
        }
      }
    })

  }

  getMeassage(item?){
    this.searchText = item?.phoneNumber ?? item;
    this.sideNavService.setSidenav(this.messageSidenav);
    if (this.tokenInfo.userID) {
      var itemId=this.tokenInfo.userID;
        this.sideNavService.openSidePanel({Message: itemId});
    }
  }


  getAllImportantNumberCategories() {
      const dialogRef = this.dialog.open(ImportantHeaderPopUpComponent, {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop:true,
        width: '984px',
        position: {
          top: '70px',
          // right: '480px'
        }
      });
      dialogRef.afterClosed()
      .subscribe((res: any) => {
        if(res?.e === 'Message')
        this.getMeassage(res.data)
      });
    }

  getEffectiveDispatchNotifications(){
    this.headerService.getEffectiveDispatchNotifications().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.notificationData = res.data;
      },
    });
  }

    openDispatchPopUp() {
      const dialogRef = this.dialog.open(DispatchBookHeaderPopUpComponent, {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop:true,
        width: '350px',
        position: {
          top: '70px',
          right: '180px'
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {

      });
    }

    viewPdf(item:any) {
      window.open(item.fileInfo);
    }

    openHelpPopUp() {
      const dialogRef = this.dialog.open(HelpHeaderPopUpComponent, {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop:true,
        width: '350px',
        position: {
          top: '70px',
          right: '80px'
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {
        if(res?.e === 'Message')
        this.getMeassage(res.data)
      });

    }


    close(): void {
      this.sideNavService.close();
      this.headerService.clearSelection$.next(true);
    }


  deleteNotifications(item){
    this.dialog
    .open(ConfirmDialogComponent, {
      width: "300px",
      data: {
        title: "Delete Notification",
        message: "Do you want to delete this notification?",
      },
    })
    .afterClosed()
    .subscribe((res) => {
      if (res === "Confirm"){
        const payload={
          id:item.dispatchNotificationId
        }
        this.headerService.deleteDispatchNotification(payload).subscribe({
          next:(res:any)=>{
            this.getEffectiveDispatchNotifications()
          }
        })
       this.snackBar.openFromComponent(SnackbarComponent,
      {
        duration: 3000,
        horizontalPosition: 'center',
        data: {
          title: 'Notification Deleted successfully',
          action: 'Dismiss',
          type: 'snackbar-success',
        },
      }
  );
      }
    });
  }

  getAllImportantNumbers(item){
    this.importantNumbers = [];
    this.categoryName = item?.categoryName ?? null;
    const payload = {
      category: item?.categoryName ?? null,
      filter: item?.filter ?? ''
    }
    this.headerService.getAllImportantNumbers(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res:any) => {
        this.importantNumbers = res.data;
      }
    })
  }
  openAlertPop(){
    this.dialog
      .open(AlertHeaderPopUpComponent, {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop:true,
        width: '350px',
        position: {
          top: '70px',
          right: '610px'
        }
      });
  }

  searchAllImportantNumbers(item){
    if (item?.target.value.trim() === '') {
      return;
    }
    const payload = {
      category: this.categoryName ,
      filter: item?.target.value.trim()
    }
    this.headerService.getAllImportantNumbers(payload).subscribe({
      next: (res:any) => {
          this.importantNumbers = res.data;
      }
    })
  }


  closeMenu() {
    this.matMenuTrigger.closeMenu();
  }

  initializeRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new (window['SpeechRecognition'] || window['webkitSpeechRecognition'])();
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.zone.run(() => {
          this.isListening = true;
        });
      };

      this.recognition.onresult = (event: any) => {
        this.isListening = false;
        const transcript = event.results[0][0].transcript;
        const currentMessage = this.alertForm.get('message').value || '';
        this.alertForm.get('message').setValue(currentMessage + transcript);
      };

      this.recognition.onend = () => {
        this.zone.run(() => {
          this.isListening = false;
        });
      };
    }
  }


  toggleSpeechRecognition() {
    if (this.isListening) {
      this.stopSpeechRecognition();
    } else {
      this.startSpeechRecognition();
    }
  }

  startSpeechRecognition() {
    this.recognition.start();
    this.isListening = true;
  }

  stopSpeechRecognition() {
    this.recognition.stop();
    this.isListening = false;
  }

  openMenuSidebar(){
    this.sideNavService.setSidenav(this.menuSideNav);
    if (this.tokenInfo.userID) {
      var itemId=this.tokenInfo.userID;
        this.sideNavService.openSidePanel({Menu: itemId});
    }
  }

}


interface PendingProcess {
  action: string;
  id: string;
  response: {
    data?:string
    message: string;
    responseType: string;
  };
}
