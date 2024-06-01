import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { EditMemberDetailSideBarComponent } from './edit-member-detail-side-bar/edit-member-detail-side-bar.component';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { DataGridModule } from 'src/app/data-grid/data-grid.module';
import { AddNewMemberPopUpComponent } from './add-new-member-pop-up/add-new-member-pop-up.component';
import { MembersComponent } from './members/members.component';
import { MemberCallHistorySideBarComponent } from './member-call-history-side-bar/member-call-history-side-bar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { LicenceInfoComponent } from './licence-info/licence-info.component';
import { MemberEquipmentsComponent } from './member-equipments/member-equipments.component';
import { MemberSettingsComponent } from './member-settings/member-settings.component';
import { MemberCallHistoryComponent } from './member-call-history/member-call-history.component';
import { MemberMappedRadiosComponent } from './member-mapped-radios/member-mapped-radios.component';
import { AddMemberMappedRadiosPopUpComponent } from './add-member-mapped-radios-pop-up/add-member-mapped-radios-pop-up.component';

@NgModule({
  declarations: [
    EditMemberDetailSideBarComponent,
    AddNewMemberPopUpComponent,
    MembersComponent,
    MemberCallHistorySideBarComponent,
    ContactInfoComponent,
    LicenceInfoComponent,
    MemberEquipmentsComponent,
    MemberSettingsComponent,
    MemberCallHistoryComponent,
    MemberMappedRadiosComponent,
    AddMemberMappedRadiosPopUpComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    DataGridModule,
    MembersRoutingModule,
    AngularMaterialModule
  ]

})
export class MembersModule { }
