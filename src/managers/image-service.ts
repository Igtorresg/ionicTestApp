import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadUserImageUseCase } from 'src/app/use-cases/upload-user-image.use-case';

@Injectable({
  providedIn: 'root',
})

export class ImageService {

  constructor(private uploadUserImageUseCase: UploadUserImageUseCase) { }

  async getImageFromCamera(): Promise<{ success: boolean, message: string, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
  
      const imageUrl = image.dataUrl;
      if (imageUrl) {
        return await this.uploadImage(imageUrl);
      } else {
        return { success: false, message: 'No se pudo obtener el enlace de la imagen.' };
      }
    } catch (error) {
      return { success: false, message: 'Error al obtener la imagen de la cámara.' };
    }
  }
  
  async getImageFromGallery(): Promise<{ success: boolean, message: string, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
  
      const imageUrl = image.dataUrl;
      if (imageUrl) {
        return await this.uploadImage(imageUrl);
      } else {
        return { success: false, message: 'No se pudo obtener el enlace de la imagen.' };
      }
    } catch (error) {
      return { success: false, message: 'Error al obtener la imagen de la galería.' };
    }
  }

  private async uploadImage(imageUrl: string): Promise<{ success: boolean, message: string, imageUrl?: string }> {
    const uploadResult = await this.uploadUserImageUseCase.UploadUserImage(imageUrl);

    if (uploadResult.success) {
      return { success: true, message: 'Imagen subida con éxito', imageUrl: imageUrl };
    } else {
      return { success: false, message: uploadResult.message };
    }
  }

}