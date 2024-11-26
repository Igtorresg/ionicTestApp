import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhiskyPageRoutingModule } from './whisky-routing.module';

import { WhiskyPage } from './whisky.page';
import { ComponentsModule } from 'src/app/components/components.module';  // Importa el módulo de componentes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhiskyPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WhiskyPage], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WhiskyPageModule {}
