import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return of(false); // Retorna un Observable con el valor false
        }
        return this.db
          .object(`users/${user.uid}/role`)
          .valueChanges()
          .pipe(
            map((role) => {
              if (role === 'admin') {
                return true;
              } else {
                this.router.navigate(['/home']);
                return false;
              }
            })
          );
      })
    );
  }
}
