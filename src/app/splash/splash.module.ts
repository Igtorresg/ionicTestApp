import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashPageRoutingModule } from './splash-routing.module';
import { defineCustomElements } from "@teamhive/lottie-player/loader";
import { SplashPage } from './splash.page';
defineCustomElements(window);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashPageRoutingModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SplashPage]
})
export class SplashPageModule {}
