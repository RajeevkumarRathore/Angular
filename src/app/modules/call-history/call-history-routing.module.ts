import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallHistoryComponent } from './call-history/call-history.component';

const routes: Routes = [{ path: '',     children: [
  { path: '', component: CallHistoryComponent, data: { title: "Call History" } } 
  ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallHistoryRoutingModule { }
