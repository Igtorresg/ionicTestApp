import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { getAuth, deleteUser } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class SessionManager {
  public userName: string | null = null;
  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {
    this.init();
  }

  // Inicializa el storage
  async init() {
    await this.storage.create();
  }

  

  // Verifica si el usuario está logueado usando Ionic Storage
  async isLoggedIn(): Promise<boolean> {
    const session = await this.storage.get('isLoggedIn');
    return session ? session : false;
  }


  async eliminarCuenta(): Promise<boolean> {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      // Crear alerta de confirmación
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              // No se hace nada si se cancela
              return false; // Resuelve con false si se cancela
            },
          },
          {
            text: 'Eliminar',
            handler: async () => {
              // Se ejecuta si el usuario presiona 'Eliminar'
              try {
                await deleteUser(user);
                console.log('Cuenta eliminada con éxito');
  
                // Alerta de éxito
                const successAlert = await this.alertController.create({
                  message: 'Su cuenta se eliminó correctamente.',
                  buttons: ['OK'],
                });
                await successAlert.present();
  
                // Devolver true indicando que la cuenta fue eliminada
                return true; // Resuelve con true si se eliminó
              } catch (error) {
                console.error('Error al eliminar la cuenta:', error);
  
                // Mostrar alerta de error
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'No se pudo eliminar la cuenta. Asegúrate de que estás autenticado correctamente.',
                  buttons: ['OK'],
                });
                await errorAlert.present();
  
                // Devolver false indicando que la eliminación falló
                return false; // Resuelve con false si hubo un error
              }
            },
          },
        ],
      });
  
      // Presentar la alerta de confirmación
      await alert.present();
  
      // Esperar a que se cierre la alerta y manejar la resolución de la promesa
      const { role } = await alert.onDidDismiss();
      if (role === 'cancel') {
        return false; // Se cancela la operación
      } else {
        // El usuario ha decidido eliminar, devolver la resolución del botón "Eliminar"
        return true; 
      }
    } else {
      console.log('No hay usuario autenticado');
      return false; // Retornar false si no hay usuario
    }
  }
  
}
