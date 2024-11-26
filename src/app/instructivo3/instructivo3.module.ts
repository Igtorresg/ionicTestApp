import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Instructivo3PageRoutingModule } from './instructivo3-routing.module';

import { Instructivo3Page } from './instructivo3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Instructivo3PageRoutingModule
  ],
  declarations: [Instructivo3Page]
})
export class Instructivo3PageModule {}
