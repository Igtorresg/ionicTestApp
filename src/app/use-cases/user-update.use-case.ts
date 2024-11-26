import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { StorageService } from 'src/managers/StorageService';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateUseCase {

  constructor(
    private db: AngularFireDatabase,
    private storageService: StorageService,
    private fireAuth: AngularFireAuth
  ) { }

  async performUserUpdate(newName: string): Promise<{ success: boolean; message: string }> {
    try {
      // Obtener el usuario actual desde Ionic Storage
      const currentUser = await this.storageService.get('user');

      if (!currentUser) {
        return { success: false, message: 'No hay usuario guardado' };
      }

      const uid = currentUser.uid;

      // Si hay un nuevo nombre, actualiza en Realtime Database
      if (newName) {
        await this.db.object(`/users/${uid}`).update({
          displayName: newName
        });

        // Actualizar el usuario en StorageService
        const updatedUserData = {
          uid: uid,
          nombreusuario: newName,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          displayName: newName,
          photoURL: currentUser.photoURL
        };

        await this.storageService.set('user', updatedUserData);

        return { success: true, message: 'Usuario actializado con éxito' };
      } else {
        return { success: false, message: 'No se pudo actualizar el usuario' };
      }

    } catch (error: any) {
      return { success: false, message: `Error updating user: ${error.message}` };
    }
  }
}