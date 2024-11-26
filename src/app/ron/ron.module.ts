import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RonPageRoutingModule } from './ron-routing.module';

import { RonPage } from './ron.page';
import { ComponentsModule } from 'src/app/components/components.module';  // Importa el módulo de componentes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RonPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RonPage], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RonPageModule {}
