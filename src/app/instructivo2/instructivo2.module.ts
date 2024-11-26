import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Instructivo2PageRoutingModule } from './instructivo2-routing.module';

import { Instructivo2Page } from './instructivo2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Instructivo2PageRoutingModule
  ],
  declarations: [Instructivo2Page]
})
export class Instructivo2PageModule {}
