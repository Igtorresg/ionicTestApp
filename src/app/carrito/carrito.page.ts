import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';
import {GeolocationService} from 'src/managers/geolocation';
import { PedidosService } from '../pedidos.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart: any[] = []; // Arreglo para almacenar los productos del carrito
  username: string = '';
  Sucursal: string = '';

  constructor(
    private StorageService: StorageService,
    private pedidosService: PedidosService,
    private alertController: AlertController,
    private menuController: MenuController,
    private router: Router,
    private GeolocationService : GeolocationService
  ) {}

  ngOnInit() {
    this.loadCart(); // Cargar el carrito desde localStorage
    this.loadUserData(); // Cargar el nombre de usuario y sucursal desde Ionic Storage
  }

  async abrirgoogleMaps() {
    const location = await this.GeolocationService.getSavedLocation();
    if (location) {
      this.GeolocationService.openGoogleMaps(location.latitude, location.longitude);
    }
  }

  async loadCart() {
    try {
      const storedCart = await this.StorageService.get('cart'); 
      this.cart = storedCart || []; // Setea el carro con la const storedCart
    } catch (error) {
      console.error('Error loading cart:', error);
      this.cart = []; 
    }
  }

  // Cargar el nombre de usuario y sucursal desde Ionic Storage
  async loadUserData() {
    const Usuario = await this.StorageService.get('nombreuser'); // Suponiendo que tienes un 'username' guardado en el storage
    
    const sucursal = await this.StorageService.get('sucursalSeleccionada');

    this.Sucursal = sucursal;
    this.username = Usuario;
  }

  // Método para realizar la reserva
  reserve() {
    if (this.cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Se llama al funcion saveOrder que a su vez llama al servicio pedidos
    this.saveOrder();
  }

  async saveOrder() {
    const order = {
      username: this.username, // Nombre de usuario
      products: this.cart,
      sucursal: this.Sucursal, // Sucursal seleccionada
      total: this.calculateTotal(),
      date: new Date(),
    };

    // Guardar el pedido en Firestore
    this.pedidosService
      .saveOrder(order)
      .then(async () => {
        const alert = await this.alertController.create({
          header: 'Pedido realizado',
          message: `Ya puede retirar su pedido en la sucursal ${this.Sucursal}`,
          buttons: [
            {
              text: 'OK',
              handler: async () => {
                // Al presionar el botón "OK", obtenemos la ubicación actual
                const location = await this.GeolocationService.getLocation();
                if (location) {
                  // Llamamos a abrirGoogleMaps con la ubicación actual
                  this.GeolocationService.openGoogleMaps(location.latitude, location.longitude);
                }
              }
            }
          ],
        });
        await alert.present();
        this.clearCart(); // Limpiar el carrito después de realizar el pedido
      })
      .catch((error) => {
        console.error('Error al guardar el pedido:', error);
        alert('Ocurrió un error al realizar el pedido.');
      });
  }
  //Calcular total del carrito
  calculateTotal() {
    return this.cart.reduce((total, product) => total + Number(product.price), 0);
  }

  // Limpiar el carrito
  async clearCart() {
    await this.StorageService.remove('cart');
    this.cart = [];
  }

  carrito() {
    this.router.navigate(['/carrito']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }
}
