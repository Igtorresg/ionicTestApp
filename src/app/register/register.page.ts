import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserRegistrationUseCase } from 'src/app/use-cases/user-registration.use-case';
import { StorageService} from 'src/managers/StorageService';
import { CancelAlertService } from 'src/managers/CancelAlertService';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: string = '';
  email: string = '';
  password: string = '';
  termsAccepted: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private StorageService : StorageService,
    private userRegistrationUseCase: UserRegistrationUseCase,
    private alert: CancelAlertService
  ) {}

  async onRegisterButtonPressed() {
    if (!this.termsAccepted) {
      return this.showAlert('Error', 'Debe aceptar los términos y condiciones');
    }

    if (!this.usuario || !this.email || !this.password) {
      return this.showAlert('Error', 'Por favor completa todos los campos');
    }

    if (!this.validateEmail(this.email)) {
      return this.showAlert('Error', 'Por favor introduce un correo electrónico válido');
    }

    if (!this.validatePassword(this.password)) {
      return this.showAlert(
        'Error',
        'La contraseña debe tener al menos 6 caracteres y debe incluir letras mayúsculas y minúsculas.'
      );
    }

    const result = await this.userRegistrationUseCase.performRegistration(this.usuario,this.email, this.password);
    if (result.success) {
      
      console.log('Nombre de usuario:', this.usuario);
      console.log('Correo:',this.email)
      this.alert.showAlert(
        'Registro exitoso',
        'Ahora ya eres parte de la terraza',
        () => {
          this.router.navigate(['/splash']);
        }
      );
    } else {
      this.alert.showAlert(
        'Error',
        result.message,
        () => {
          this.clean();
        }
      );
    }
  }

  clean() {
    this.usuario = '';
    this.email = '';
    this.password = '';
    this.termsAccepted = false; // Reset terms accepted
  }

  async showAlert(header: string, message: string) {
    await this.alert.showAlert(header, message, () => {});
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordPattern.test(password);
  }

  async onLoginButtonPressed() {
    this.router.navigate(['/login']);
  }
}
