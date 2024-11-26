import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserLoginGoogleUseCase {
  public userName: string | null = null;
  correo: string | null = null;

  constructor(private storageService: StorageService) {}

  async loginWithGoogle(): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const auth = getAuth(); // Obtener la instancia de autenticación
      const provider = new GoogleAuthProvider(); // Configurar el proveedor de Google
      
      // Ejecutar el inicio de sesión con Google
      const result = await signInWithPopup(auth, provider);

      // Obtener los datos del usuario autenticado
      const user = result.user;
      this.userName = user.displayName;
      this.correo = user.email;

      // Guardar la información del usuario en Ionic Storage
      await this.storageService.set('nombreuser', this.userName);
      await this.storageService.set('isLoggedIn', true);
      await this.storageService.set('user', {
        nombreusuario: this.userName,
        email: this.correo || ''
      });

      console.log('Inicio de sesión exitoso:', user);
      return { success: true, message: 'Inicio de sesión exitoso', user };
    } catch (error: any) {
      console.error('Error durante el inicio de sesión:', error);
      return { success: false, message: error.message || 'Error desconocido durante el inicio de sesión' };
    }
  }
}
