import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private firestore: AngularFirestore) { }

  // Método para guardar un pedido en Firestore
  saveOrder(order: any): Promise<void> {
    return new Promise((resolve, reject) => {
      // Asumiendo que tienes una colección "pedidos" en Firestore
      this.firestore.collection('pedidos').add(order)
        .then(() => {
          resolve(); // Resuelve la promesa si se guardó correctamente
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            reject(error.message); // Rechaza la promesa si ocurre un error
          } else {
            reject('Error desconocido al guardar el pedido');
          }
        });
    });
  }
}
