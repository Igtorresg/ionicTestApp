// product-page.component.ts
import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  // Define los datos que el componente recibirá
  @Input() product: {
    name: string;
    cantidad: number;
    price: number;
    imageUrl: string;
    category: string;
  } = {
    name: '',
    cantidad: 0,
    price: 0,
    imageUrl: '',
    category: '',
  };

  // Inyectar AlertController y StorageService
  constructor(
    private alertController: AlertController,
    private storageService: StorageService
  ) {}

  // Método para añadir el producto al carrito
  async addToCart() {
    console.log(`${this.product.name} añadido al carrito.`);

    // Obtener carrito desde StorageService o inicializar uno vacío
    let cart = (await this.storageService.get('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(
      (item: any) => item.name === this.product.name
    );

    if (existingProductIndex > -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      cart[existingProductIndex].cantidad += 1;
    } else {
      // Si el producto no está en el carrito, añádelo con cantidad inicial 1
      this.product.cantidad = 1;
      cart.push(this.product);
    }

    // Guardar el carrito actualizado en StorageService
    await this.storageService.set('cart', cart);

    console.log('Carrito actualizado:', cart);

    // Mostrar mensaje de confirmación
    const alert = await this.alertController.create({
      message: 'El producto se añadió al carrito.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
