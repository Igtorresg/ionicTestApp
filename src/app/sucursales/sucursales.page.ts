import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GeolocationService } from 'src/managers/geolocation';
import { Router } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private GeolocationService: GeolocationService,
    private StorageService: StorageService,
    private menuController: MenuController,
    private router: Router
  ) {}

  async ngOnInit() {
    // Decidir si quieres pedir la ubicación siempre, ignorando la guardada
    const forceRequestLocation = true;  // Cambia esto según tus necesidades

    if (forceRequestLocation) {
      console.log('Solicitando ubicación...');
      const location = await this.GeolocationService.getLocation();
      if (location) {
        console.log('Ubicación obtenida:', location);
      } else {
        console.error('No se pudo obtener la ubicación');
      }
    } else {
      // Intentar obtener la ubicación guardada
      const savedLocation = await this.GeolocationService.getSavedLocation();

      if (savedLocation) {
        console.log('Ubicación guardada:', savedLocation);
      } else {
        console.log('No se encontró ubicación guardada, solicitando ubicación...');
        const location = await this.GeolocationService.getLocation();
        if (location) {
          console.log('Ubicación obtenida:', location);
        } else {
          console.error('No se pudo obtener la ubicación');
        }
      }
    }
  }

  async ionViewWillEnter() {
    // Aquí puedes agregar código si necesitas realizar algo cuando la vista está a punto de entrar
  }

  async seleccionarSucursal(sucursal: string) {
    await this.StorageService.set('sucursalSeleccionada', sucursal);

    // Navegar y reemplazar la URL para evitar que se quede en el historial
    await this.router.navigate(['/home']);

    // Usar setTimeout para dar tiempo a que se navegue antes de recargar
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
