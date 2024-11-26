import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserLogoutUseCase } from 'src/app/use-cases/user-logout.user-case';
import { StorageService } from 'src/managers/StorageService';
import { UserUpdateUseCase } from 'src/app/use-cases/user-update.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { ImageService } from 'src/managers/image-service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userEmail: string = '';
  userName: string = '';
  userPhotoURL: string = 'assets/default-avatar.png';
  nombreNuevo: string = '';

  constructor(
    private storageService: StorageService,
    private Router: Router,
    private userUpdateUseCase: UserUpdateUseCase,
    private UserLogoutUseCase: UserLogoutUseCase,
    private alert: CancelAlertService,
    private imageService: ImageService,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    const user = await this.storageService.get('user');

    if (user) {
      // Chequeo de email, si es nulo o vacío, asignar valor por defecto
      this.userEmail =
        user.email && user.email.trim() !== ''
          ? user.email
          : 'Correo no disponible';

      // Chequeo de nombre
      this.userName =
        user.nombreusuario || this.storageService.get('nombreuser') ;

      // Chequeo de foto, si es nula o vacía, asignar foto por defecto
      this.userPhotoURL =
        user.photoURL && user.photoURL.trim() !== ''
          ? user.photoURL
          : 'src/assets/img/usuario.png';
    }
  }

  async onUpdateButtonPressed() {
    const result = await this.userUpdateUseCase.performUserUpdate(
      this.nombreNuevo
    );

    if (result.success) {
      this.alert.showAlert(
        'Actualización Exitosa',
        'Tu perfil ha sido actualizado correctamente.',
        () => {location.reload();}
      );
    } else {
      this.alert.showAlert('Error', result.message, () => {});
    }
  }

  async onProfileImagePressed() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: async () => {
            const uploadResult = await this.imageService.getImageFromCamera();
            this.handleImageUploadResult(uploadResult);
          }
        },
        {
          text: 'Imágenes',
          icon: 'image',
          handler: async () => {
            const uploadResult = await this.imageService.getImageFromGallery();
            this.handleImageUploadResult(uploadResult);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    await actionSheet.present();
  }

  private handleImageUploadResult(uploadResult: { success: boolean, message: string, imageUrl?: string }) {
    if (uploadResult.success) {
      this.alert.showAlert(
        'Imagen Actualizada',
        'Tu imagen de perfil ha sido actualizada con éxito.',
        () => {
          this.userPhotoURL = uploadResult.imageUrl || 'assets/default-avatar.png';
        }
      );
    } else {
      this.alert.showAlert(
        'Error',
        uploadResult.message,
        () => { }
      );
    }
  }


  perfil() {
    this.Router.navigate(['/perfil']);
  }

  carrito() {
    this.Router.navigate(['/carrito']);
  }

  logout() {
    this.alert.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.UserLogoutUseCase.performLogout();
        this.Router.navigate(['/comienzo']);
      },
      () => {}
    );
  }
}
