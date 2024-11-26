import { Injectable } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';
import { FirebaseStorageService } from 'src/managers/storage-service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class UploadUserImageUseCase {

  constructor(
    private storageService: StorageService,
    private firebaseStorageService: FirebaseStorageService,
    private db: AngularFireDatabase // Acceso a Realtime Database
  ) {}

  async UploadUserImage(imageUrl: string): Promise<{ success: boolean, message: string }> {
    try {
      // Obtiene el usuario almacenado localmente desde StorageService
      const user = await this.storageService.get('user');

      if (user && user.uid) {
        const uid = user.uid;

        // Define la ruta de almacenamiento en Firebase Storage
        const path = `Users/${uid}/profile-image.jpg`;

        // Sube la imagen a Firebase Storage y obtén la URL de la imagen subida
        const downloadURL = await this.firebaseStorageService.uploadFile(imageUrl, path, 'profile-image.jpg');

        // Actualiza el nodo del usuario en Realtime Database con la nueva URL de la imagen
        await this.db.object(`users/${uid}`).update({ photoURL: downloadURL });

        // Actualiza el campo photoURL del usuario en StorageService
        user.photoURL = downloadURL;
        await this.storageService.set('user', user);

        // Guarda la URL de la imagen también en el StorageService bajo la clave "UserPhotoURL"
        await this.storageService.set('UserPhotoURL', downloadURL);

        return { success: true, message: 'Imagen de usuario actualizada con éxito.' };

      } else {
        return { success: false, message: 'No se encontró el UID del usuario.' };
      }

    } catch (error: any) {
      return { success: false, message: `Error al subir la imagen: ${error.message}` };
    }
  }
}