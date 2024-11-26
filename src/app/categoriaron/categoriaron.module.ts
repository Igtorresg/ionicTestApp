import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaronPageRoutingModule } from './categoriaron-routing.module';

import { CategoriaronPage } from './categoriaron.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaronPageRoutingModule
  ],
  declarations: [CategoriaronPage]
})
export class CategoriaronPageModule {}
