import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriavinoPageRoutingModule } from './categoriavino-routing.module';

import { CategoriavinoPage } from './categoriavino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriavinoPageRoutingModule
  ],
  declarations: [CategoriavinoPage]
})
export class CategoriavinoPageModule {}
