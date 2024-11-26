
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorPageRoutingModule } from './error-routing.module';
import { defineCustomElements } from "@teamhive/lottie-player/loader";
import { ErrorPage } from './error.page';
defineCustomElements(window);
@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorPageRoutingModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ErrorPage]
})
export class ErrorPageModule {}
