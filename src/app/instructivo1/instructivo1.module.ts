import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Instructivo1PageRoutingModule } from './instructivo1-routing.module';

import { Instructivo1Page } from './instructivo1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Instructivo1PageRoutingModule
  ],
  declarations: [Instructivo1Page]
})
export class Instructivo1PageModule {}
