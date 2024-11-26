import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario: string | null = null;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private sessionManager: SessionManager,
    private storage: Storage
  ) {}

  async ngOnInit() {
    
  }
  async openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
  cerrarmenu() {
    this.menuController.close();
  }
 

  
}
