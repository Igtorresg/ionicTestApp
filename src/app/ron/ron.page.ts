import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ron',
  templateUrl: './ron.page.html',
  styleUrls: ['./ron.page.scss'],
})
export class RonPage implements OnInit {
  product: any;

  constructor(private router: Router, private menuController: MenuController) { 
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  ngOnInit() {
  }
  
  carrito() {
    this.router.navigate(['/carrito']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

  

  

  categoria() {
    this.router.navigate(['/categoriaron']);
    
  }
}
