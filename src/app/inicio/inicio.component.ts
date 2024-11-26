import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Promocion {
  imageUrl: string;
  description: string;
  discount: number;
}

interface Oferta {
  imageUrl: string;
  description: string;
  countdown: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  sucursal: string = '';
  promocionDelDia: Promocion | null = null;
  ofertaDelDia: Oferta | null = null;
  email: string = '';

  constructor(
    private StorageService: StorageService,
    private toastController: ToastController,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    console.log('ngOnInit called');
    this.sucursal = await this.StorageService.get('sucursalSeleccionada') || 'sucursal1';
    this.loadContentForSucursal(this.sucursal);
  }

  loadContentForSucursal(sucursal: string) {
    console.log('Sucursal seleccionada:', sucursal);

    let promoDocId: string = '';
    let ofertaDocId: string = '';

    if (sucursal === 'Viña') {
      promoDocId = 'corona';
      ofertaDocId = 'royal';
      
    } else if (sucursal === 'Valparaiso') {
      promoDocId = 'corona';
      ofertaDocId = 'royal';
    } else if (sucursal === 'Quilpue') {
      promoDocId = 'corona';
      ofertaDocId = 'royal';
    }

    if (promoDocId && ofertaDocId) {
      this.firestore.collection('packs cervezas').doc(promoDocId).get().subscribe((promoDoc) => {
        if (promoDoc.exists) {
          const promoData = promoDoc.data() as Promocion;
          this.promocionDelDia = {
            imageUrl: promoData?.imageUrl || '',
            description: promoData?.description || '',
            discount: promoData?.discount || 0,
          };
        } else {
          console.log('No se encontró el documento de la promoción');
        }
      });

      this.firestore.collection('packs cervezas').doc(ofertaDocId).get().subscribe((ofertaDoc) => {
        if (ofertaDoc.exists) {
          const ofertaData = ofertaDoc.data() as Oferta;
          this.ofertaDelDia = {
            imageUrl: ofertaData?.imageUrl || '',
            description: ofertaData?.description || '',
            countdown: ofertaData?.countdown || '',
          };
        } else {
          console.log('No se encontró el documento de la oferta');
        }
      });
    }
  }

  Productswithreview = [
    {
      name: 'Whisky Jack Daniels',
      
      rating: 4.5,
      reviews: [
        { user: 'Juan', comment: 'Excelente calidad', rating: 5 },
        { user: 'Maria', comment: 'Muy bueno', rating: 4 }
      ]
    },
    {
      name: 'Ron Bacardi',
      
      rating: 4.0,
      reviews: [
        { user: 'Carlos', comment: 'Buen sabor', rating: 4 }
      ]
    }
  ];

  // Método para manejar la suscripción al boletín
  subscribeToNewsletter() {
    if (this.email && this.validateEmail(this.email)) {
      
      console.log('Email suscrito:', this.email);
      this.presentToast('¡Te has suscrito al boletín con éxito!');
      this.email = '';  // Limpiar el input después de suscribirse
    } else {
      this.presentToast('Por favor, ingresa un email válido.');
    }
  }

  // Método para mostrar un mensaje de notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración del mensaje (2 segundos)
      position: 'bottom'
    });
    toast.present();
  }

  // Validación básica de email
  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

