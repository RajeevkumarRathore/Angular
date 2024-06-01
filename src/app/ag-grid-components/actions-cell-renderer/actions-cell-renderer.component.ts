import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-actions-cell-renderer',
  templateUrl: './actions-cell-renderer.component.html',
  styleUrls: ['./actions-cell-renderer.component.scss']
})
export class ActionsCellRendererComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() params: any;
  rowData: any;

constructor(){}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  agInit(params: any): void {
    this.params = params;
   if(params.data){
    this.rowData = params.data;
   }
  }

  edit(){
    this.params.edit(this.params);
  }
  delete(){
    this.params.delete(this.params);
  }

  restore(){
    this.params.restore(this.params);
  }
}
