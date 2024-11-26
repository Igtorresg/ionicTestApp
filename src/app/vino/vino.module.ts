import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VinoPageRoutingModule } from './vino-routing.module';

import { VinoPage } from './vino.page';
import { ComponentsModule } from 'src/app/components/components.module';  // Importa el módulo de componentes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VinoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VinoPage], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VinoPageModule {}
