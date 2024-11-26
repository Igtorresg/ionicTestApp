import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager'; // Importar el session manager desde la ruta correcta
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  searchQuery: string = '';
  categories: string[] = ['Cervezas', 'Vinos', 'Ron', 'Whisky'];
  isAuthenticated: boolean = false; // Variable para verificar autenticación
  countdown: string = '';
  endTime: number = Date.now() + 24 * 60 * 60 * 1000; // Tiempo final en 24 horas

  constructor(
    private router: Router,
    private storage: Storage,
    private menuController: MenuController,
    private sessionManager: SessionManager,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    
  }

  // Función para redirigir a la categoría seleccionada
  goToCategory(category: string) {
    if (category === 'Cervezas') {
      this.router.navigate(['/categoriacerveza']); // Redirige a la página de cervezas
    } else if (category === 'Vinos') {
      this.router.navigate(['/categoriavino']); // Redirige a la página de vinos
    } else if (category === 'Ron') {
      this.router.navigate(['/categoriaron']); // Redirige a la página de ron
    } else if (category === 'Whisky') {
      this.router.navigate(['/categoriawhisky']); // Redirige a la página de whisky
    }
    this.menuController.close(); // Cierra el menú después de navegar
  }
  startCountdown() {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = this.endTime - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        this.countdown = '0h 0m 0s';
      } else {
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        this.countdown = `${hours}h ${minutes}m ${seconds}s`; // <-- Corrected template literal
      }
    }, 1000);
  }

  async presentWelcomeAlert(username: string) {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `Bienvenido a la terraza, ${username}`,
      buttons: ['OK'],
    });
    await alert.present();
  }
  ionViewWillLeave() {
    localStorage.setItem('endTime', this.endTime.toString());
  }

  perfil() {
    this.router.navigate(['/perfil'])
  }

  

  // Validación básica de email
  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Método para mostrar un mensaje de notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del mensaje (2 segundos)
      position: 'bottom',
    });
    toast.present();
  }
  palhome() {
    this.router.navigate(['/home']);
    this.menuController.close();
  }
  carrito(){
    this.router.navigate(['/carrito']);
  }
}
