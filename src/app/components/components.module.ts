// components.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductPageComponent } from 'src/app/product-page/product-page.component';  // Importa el componente

@NgModule({
  declarations: [ProductPageComponent],//Reutilizo product page en cerveza  
  imports: [CommonModule, IonicModule],  
  exports: [ProductPageComponent]  
})
export class ComponentsModule {}
