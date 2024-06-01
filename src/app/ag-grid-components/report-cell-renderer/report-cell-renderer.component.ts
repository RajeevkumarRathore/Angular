import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { ThanksMessageToAllPopUpComponent } from 'src/app/modules/report/thanks-message-to-all-pop-up/thanks-message-to-all-pop-up.component';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-cell-renderer',
  templateUrl: './report-cell-renderer.component.html',
  styleUrls: ['./report-cell-renderer.component.scss'],
})
export class ReportCellRendererComponent {
  @Input() params: any;
  public rowData: any = {};
  name: any;

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) {}

  agInit(params: any): void {
    
    this.params = params;
    if (params.data) {
      this.rowData = params.data;
    }
  }

  ViewThankyou() {
    const message = this.getMessage();

    this.dialog
    .open(ThanksMessageToAllPopUpComponent, {
      width: '600px',
      data: {
        thankYou: 'thankYou',
        message:  message,
        
      },
    })
  }

  sendThankyouMessage() {
    
    this.name =
      this.rowData.memberFirstName + ' ' + this.rowData.memberLastName;
    this.dialog
      .open(ThanksMessageToAllPopUpComponent, {
        width: '450px',
        data: {
          sendMessage: 'sendMessage',
          message:
            'Do you want to send thank you messages to <strong>' +
            this.name +
            '</strong> ?',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'Yes, send it!') {
          const message = this.getMessage(res);
          const payload = {
            badgeNumber: this.params.data.badge_number,
            messageText: message,
          };
          this.reportService
            .sendThankyouMessage(payload)
            .subscribe((res: any) => {
              if (res.message == 'Success') {
                this.snackBar.openFromComponent(SnackbarComponent, {
                  duration: 3000,
                  horizontalPosition: 'start',
                  data: {
                    title: res.message,
                    action: 'Dissmiss',
                    type: 'snackbar-success',
                  },
                });
              } else {
                this.snackBar.openFromComponent(SnackbarComponent, {
                  duration: 3000,
                  horizontalPosition: 'start',
                  data: {
                    title: res.message,
                    action: 'Dissmiss',
                    type: 'snackbar-error',
                  },
                });
              }
            });
        }
      });
  }


  getMessage(res?){
    if(res === 'Yes, send it!'){
      const message = 
      'Dear ' +this.rowData.memberFirstName + ' ' 
      + this.rowData.memberLastName+', Unit '+this.rowData.badge_number+

        ' Your call volume for the month of November 2023 was '+ this.rowData.nov +
        ' Thank you for your commitment to Hatzoloh & the community!'+

        ' The Operations Committee'
        return message;
    }else{
      const message = 
     '<div class="text-center"> Dear <strong>'+this.rowData.memberFirstName + ' ' 
     + this.rowData.memberLastName+'</strong>,<strong> Unit'
     +this.rowData.badge_number+'</strong>'+
     '<br/> <br/> Your call volume for the month of November 2023 was <strong>'+ this.rowData.nov +'</strong><br/> Thank you for your commitment to Hatzoloh & the community!'+
     '<br/> <br/> The Operations Committee  </div>'
     return message;
    }
  }
}
