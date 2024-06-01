import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DataGridModule } from 'src/app/data-grid/data-grid.module';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { AddContactPopUpComponent } from './add-contact-pop-up/add-contact-pop-up.component';

@NgModule({
  declarations: [
    ContactComponent,
    AddContactPopUpComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    AngularMaterialModule,
    DataGridModule,
    CommonComponentsModule,
  ],
  providers:[
    DatePipe
  ]
})
export class ContactModule { }
