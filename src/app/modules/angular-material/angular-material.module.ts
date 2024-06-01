import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMenuModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    MaterialTimePickerModule,
  ],
  exports: [
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatRippleModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    MaterialTimePickerModule
  ],
  providers:[
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ]
})
export class AngularMaterialModule { }
