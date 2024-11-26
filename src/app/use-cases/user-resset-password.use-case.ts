import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root',
})
export class UserRessetPasswordUseCase {

  constructor(
    private fireAuth: AngularFireAuth,
    
  ) {}

  async resetPassword(email: string) {
    return await this.fireAuth.sendPasswordResetEmail(email)
}
}