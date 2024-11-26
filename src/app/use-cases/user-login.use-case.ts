import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserLoginUseCase {
  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private storageService: StorageService
  ) {}

  async performLogin(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      
  
      // Autenticar el usuario utilizando Firebase Authentication
      const userCredential = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
  
      if (user) {
        const uid = user.uid;
  
        // Obtener la información del usuario desde Realtime Database
        const userRef = this.db.object(`/users/${uid}`);
        const userDataSnapshot = await userRef.query.once('value');
        const userData = userDataSnapshot.val();
  
        if (userData) {
          // Manejo de campos vacíos (nombre de usuario y foto de perfil)
          const displayName = userData.displayName || '';
          const photoURL = userData.photoURL || '';
          const username = userData.nombreuser;
  
          // Guardar los datos obtenidos de Realtime Database en Ionic Storage
          await this.storageService.set('user', {
            uid: uid,
            nombreusuario: userData.nombreuser,
            email: userData.email || '',
            displayName: displayName,
            photoURL: photoURL,
          });
          await this.storageService.set('isLoggedIn', true);
          await this.storageService.set('nombreuser', email);
  
          return { success: true, message: 'Login successful' };
        } else {
          return {
            success: false,
            message: 'User not found in Realtime Database',
          };
        }
      } else {
        return {
          success: false,
          message: 'Authentication failed, user not found',
        };
      }
    } catch (error: any) {
      let errorMessage = 'Error during login';
  
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage =
              'Usuario no encontrado. Por favor, verifica tus credenciales.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta. Inténtalo de nuevo.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Formato de correo electrónico no válido.';
            break;
          case 'auth/invalid-credential':
            errorMessage =
              'Las credenciales de autenticación son incorrectas.';
            break;
          default:
            errorMessage += ': ' + error.message;
            break;
        }
      }
  
      return { success: false, message: errorMessage };
    }
  }
  

  // Verifica si el usuario está logueado usando Ionic Storage
  async isLoggedIn(): Promise<boolean> {
    const session = await this.storageService.get('isLoggedIn');
    return session ? session : false;
  }
}
