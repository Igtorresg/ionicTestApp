import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriacervezaPageRoutingModule } from './categoriacerveza-routing.module';

import { CategoriacervezaPage } from './categoriacerveza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriacervezaPageRoutingModule
  ],
  declarations: [CategoriacervezaPage]
})
export class CategoriacervezaPageModule {}
