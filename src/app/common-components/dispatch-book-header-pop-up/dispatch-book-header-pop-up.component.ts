import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-dispatch-book-header-pop-up',
  templateUrl: './dispatch-book-header-pop-up.component.html',
  styleUrls: ['./dispatch-book-header-pop-up.component.scss']
})
export class DispatchBookHeaderPopUpComponent implements OnInit,OnDestroy{
  dispatchDetail: any;
  private destroy$ = new Subject<void>();
  title="Dispath Book"
constructor(private headerService:HeaderService,
  public dialogRef: MatDialogRef<DispatchBookHeaderPopUpComponent>,){

}
  

  ngOnInit(): void {
    this.headerService.getDispatchBooks().pipe(takeUntil(this.destroy$)).subscribe({
      next:(res:any)=>{
        this.dispatchDetail =res.data
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
  
  viewPdf(item:any) {
    window.open(item.fileInfo);
  }

  closedialog(){
 this.dialogRef.close();
  }

}
