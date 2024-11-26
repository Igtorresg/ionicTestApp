import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriawhiskyPageRoutingModule } from './categoriawhisky-routing.module';

import { CategoriawhiskyPage } from './categoriawhisky.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriawhiskyPageRoutingModule
  ],
  declarations: [CategoriawhiskyPage]
})
export class CategoriawhiskyPageModule {}
