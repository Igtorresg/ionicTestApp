import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  async uploadFile(filePath: string, storagePath: string, fileName: string): Promise<string> {
    try {
      const storageRef = this.storage.ref(storagePath);

      // Subimos el archivo
      const uploadTask = await storageRef.putString(filePath, 'data_url'); // Usando 'data_url' para base64

      // Una vez que la carga finalice, obtenemos la URL de descarga usando firstValueFrom
      const downloadURL = await firstValueFrom(storageRef.getDownloadURL());

      return downloadURL;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }
}