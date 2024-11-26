import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { sendEmailVerification } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationUseCase {
  photo = 'src/assets/img/usuario.png';

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  async performRegistration(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Registra al usuario en Firebase Authentication
      const userCredential = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // Crear objeto con los datos del usuario
        const userData = {
          nombreuser: username,
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: this.photo,
        };

        // Guarda la información del usuario en Realtime Database
        await this.db.object(`/users/${user.uid}`).set(userData);

        // Envía el correo de confirmación
        await sendEmailVerification(user)
          .then(() => {
            console.log('Correo de confirmación enviado.');
          })
          .catch((error) => {
            console.error('Error al enviar el correo de confirmación:', error);
          });
      }

      // Devuelve true si fue exitoso
      return { success: true, message: 'Usuario registrado con éxito. Se ha enviado un correo de confirmación.' };
    } catch (error: any) {
      // Manejo de errores basado en el código de Firebase
      let errorMessage = 'Ocurrió un error al registrar el usuario';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso. Por favor, utiliza otro o inicia sesión.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'La dirección de correo electrónico no es válida.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil.';
          break;
        default:
          errorMessage += ': ' + error.message;
          break;
      }

      // Devuelve false si hubo un error
      return { success: false, message: errorMessage };
    }
  }
}
