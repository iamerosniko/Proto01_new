import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//components
import { SaveBarComponent } from './savebar.component';
import { NoAccessComponent } from './noaccess.component';
import { ModalConfirmComponent } from './modal_confirm.component';
@NgModule({
  //components area
  declarations: [
    SaveBarComponent,
    NoAccessComponent,
    ModalConfirmComponent
  ],
  //modules area
  imports: [
    //angular modules
    BrowserModule,CommonModule,FormsModule,RouterModule,
    //other modules

  ],
  //services area
  providers: [],
  //components to be shared and called using selector
  exports: [
    SaveBarComponent,
    NoAccessComponent,
    ModalConfirmComponent
  ]
})
export class CommonCompModule { }
