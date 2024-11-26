import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router, 
    private sessionManager: SessionManager,
    private StorageService: StorageService
  ) {}

  async ngOnInit() {
    await this.StorageService.init(); // Inicializa el almacenamiento
  }
  async ionViewWillEnter() {
    
  
    try {
      // Espera de 2 segundos antes de redirigir
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Obtener el estado de "instructivoSeen" e "isLoggedIn" desde Ionic Storage
      const instructivoSeen = await this.StorageService.get('instructivoSeen');
      const isLoggedIn = await this.StorageService.get('isLoggedIn')  // Usa sessionManager

      // Registrar los valores en la consola para depuración
      console.log('instructivoSeen:', instructivoSeen);
      console.log('isLoggedIn:', isLoggedIn);

      // Verificar si el instructivo ya ha sido visto
      if (!instructivoSeen) {
        // Si no ha visto el instructivo, redirige a la página de instructivo
        this.router.navigate(['/instructivo1']);
      } else if (isLoggedIn) {
        // Si ha visto el instructivo y está logueado, redirige a la selección de sucursales
        this.router.navigate(['/sucursales']);
      } else {
        // Si ha visto el instructivo pero no está logueado, redirige al login
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error durante la redirección en SplashPage:', error);
    }
  }
}
