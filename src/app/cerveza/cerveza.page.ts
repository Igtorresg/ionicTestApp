import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerveza',
  templateUrl: './cerveza.page.html',
  styleUrls: ['./cerveza.page.scss'],
})
export class CervezaPage implements OnInit {
  product: any;

  constructor(private router: Router,private menuController: MenuController) { 
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  

 
  ngOnInit() {
  }
  
  carrito(){
    this.router.navigate(['/carrito']);
  }

  perfil() {
    this.router.navigate(['/perfil'])
  }
  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
  logout(){
    this.router.navigate(['/login']);
  }

  categoria() {
    this.router.navigate(['/categoriacerveza']);
    this.menuController.close();
  }
}
