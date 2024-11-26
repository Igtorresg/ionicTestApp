import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CancelAlertService } from 'src/managers/CancelAlertService'; // Asegúrate de tener el servicio de alertas
import { UserLoginUseCase } from 'src/app/use-cases/user-login.use-case';
import { UserLoginGoogleUseCase } from 'src/app/use-cases/user-login-google.use-case'
import { AlertController } from '@ionic/angular';
import { UserRessetPasswordUseCase } from 'src/app/use-cases/user-resset-password.use-case';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userLoginUseCase: UserLoginUseCase,
    private UserLoginGoogleUseCase: UserLoginGoogleUseCase,
    private UserRessetPasswordUseCase: UserRessetPasswordUseCase,
    private alert: CancelAlertService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  async onLoginButtonPressed() {
    const result = await this.userLoginUseCase.performLogin(
      this.email,
      this.password
    );
  
    if (result.success) {
      this.alert.showAlert(
        'Login exitoso',
        'Has iniciado sesión correctamente.',
        () => {
          this.router.navigate(['/splash']);
        }
      );
    } else {
      this.alert.showAlert('Error', result.message, () => {});
    }
  }

  async loginGoogle() {
    const result = await this.UserLoginGoogleUseCase.loginWithGoogle();
    if (result.success) {
      console.log('Usuario autenticado:', result.user);
      // Aquí puedes redirigir al usuario o manejar su sesión
      this.router.navigate(['/splash']);
    } else {
      console.error('Error en el inicio de sesión:', result.message);
    }
  }

  // Método para ir al formulario de registro
  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }

  // Método para abrir el pop-up de recuperación de contraseña
  async recuperarclave() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      message: 'Ingresa tu correo electrónico para recuperar tu contraseña.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El usuario canceló el formulario');
          },
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.email) {
              this.UserRessetPasswordUseCase.resetPassword(data.email); // Llama a la función para enviar el correo
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
