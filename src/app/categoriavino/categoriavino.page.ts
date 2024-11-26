import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Vino {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-categoriavino',
  templateUrl: './categoriavino.page.html',
  styleUrls: ['./categoriavino.page.scss'],
})
export class CategoriavinoPage implements OnInit {
  vinos: Vino[] = []; 

  constructor(
    private router: Router,
    private menuController: MenuController,
    private sessionManager: SessionManager,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadVinos();
  }

  carrito() {
    this.router.navigate(['/carrito']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

  // Método para cargar los vinos desde Firestore
  loadVinos() {
    // Obtiene todos los documentos de la colección 'packs vinos'
    this.firestore.collection('pack vinos').snapshotChanges().subscribe((vinosSnapshot) => {
      // Limpiar el arreglo vinos antes de agregar los nuevos datos
      this.vinos = [];

      vinosSnapshot.forEach((doc: any) => {
        const vino = doc.payload.doc.data() as Vino;

        // Agregar el vino al arreglo vinos
        this.vinos.push({
          name: vino.name || 'Nombre desconocido',
          price: vino.price || 0,
          imageUrl: vino.imageUrl || 'assets/img/default.jpg', // Imagen por defecto
          category: vino.category || 'Sin categoría',
        });
      });
    });
  }

  verProducto(vino: Vino) {
    this.router.navigate(['/vino'], { state: { product: vino } });
  }

  palhome() {
    this.router.navigate(['/home']);
    this.menuController.close();
  }
}
