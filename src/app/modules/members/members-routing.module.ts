import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';

const routes: Routes = [{ path: '',     children: [
  { path: '', component: MembersComponent, data: { title: "Members" } }
  ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
