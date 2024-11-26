import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  products: any[] = [];
  currentProduct: any = { name: '', price: 0, description: '', category: '', imageUrl: '' };
  categories: string[] = ['packs cervezas', 'pack vinos', 'packs ron', 'packs whiskys'];
  isEditing: boolean = false;
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private realtimeDb: AngularFireDatabase, // Realtime Database
    private firestore: AngularFirestore, // Firestore Database
    private storage: AngularFireStorage // Firebase Storage
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  // Obtener productos desde ambas bases de datos
  fetchProducts() {
    this.isLoading = true;
    this.products = []; // Limpiar productos antes de cargar

    this.categories.forEach((category) => {
      // Obtener productos de Realtime Database
      this.realtimeDb
        .list(category)
        .snapshotChanges()
        .subscribe((data) => {
          const productsByCategory = data.map((item: any) => ({
            id: item.key,
            ...(item.payload.val() as object),
            category, // Añadir categoría al producto
          }));
          this.products = [...this.products, ...productsByCategory];
          this.isLoading = false;
        });

      // Obtener productos de Firestore
      this.firestore
        .collection(category)
        .snapshotChanges()
        .subscribe((data) => {
          const productsByCategory = data.map((doc: any) => ({
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as object),
            category,
          }));
          this.products = [...this.products, ...productsByCategory];
          this.isLoading = false;
        });
    });
  }

  // Agregar producto en ambas bases de datos
  addProduct() {
    if (this.isValidProduct()) {
      const categoryPath = this.currentProduct.category;

      if (!this.categories.includes(categoryPath)) {
        this.message = `La categoría "${this.currentProduct.category}" no es válida.`;
        return;
      }

      // Guardar en Realtime Database
      this.realtimeDb
        .list(categoryPath)
        .push(this.currentProduct)
        .then((ref) => {
          console.log('Producto guardado en Realtime Database con ID:', ref.key);
          this.currentProduct.id = ref.key; // Asignar ID generado
        })
        .catch((error) => console.error('Error al guardar en Realtime Database:', error));

      // Guardar en Firestore
      this.firestore
        .collection(categoryPath)
        .add(this.currentProduct)
        .then((docRef) => {
          console.log('Producto guardado en Firestore con ID:', docRef.id);
          this.message = 'Producto guardado en ambas bases de datos';
          this.clearForm();
          this.fetchProducts();
        })
        .catch((error) => {
          console.error('Error al guardar en Firestore:', error.code, error.message);
          this.message = `Error al guardar en Firestore: ${error.message}`;
        });
    } else {
      this.message = 'Por favor, completa todos los campos';
    }
  }

  // Editar producto
  editProduct(product: any) {
    this.currentProduct = { ...product };
    this.isEditing = true;
  }

  // Actualizar producto en ambas bases de datos
  updateProduct() {
    if (this.isValidProduct() && this.currentProduct.id) {
      const categoryPath = this.currentProduct.category;

      if (!this.categories.includes(categoryPath)) {
        this.message = `La categoría "${this.currentProduct.category}" no es válida.`;
        return;
      }

      // Actualizar en Realtime Database
      this.realtimeDb
        .object(`${categoryPath}/${this.currentProduct.id}`)
        .update(this.currentProduct)
        .then(() => console.log('Producto actualizado en Realtime Database'))
        .catch((error) => console.error('Error al actualizar en Realtime Database:', error));

      // Actualizar en Firestore
      this.firestore
        .doc(`${categoryPath}/${this.currentProduct.id}`)
        .update(this.currentProduct)
        .then(() => {
          this.message = 'Producto actualizado en ambas bases de datos';
          this.clearForm();
          this.fetchProducts();
        })
        .catch((error) => {
          console.error('Error al actualizar en Firestore:', error.code, error.message);
          this.message = `Error al actualizar en Firestore: ${error.message}`;
        });
    } else {
      this.message = 'El ID del producto no es válido o faltan campos';
    }
  }

  // Eliminar producto en ambas bases de datos
  deleteProduct(product: any) {
    const categoryPath = product.category;

    if (!this.categories.includes(categoryPath)) {
      this.message = `La categoría "${product.category}" no es válida.`;
      return;
    }

    // Eliminar de Realtime Database
    this.realtimeDb
      .object(`${categoryPath}/${product.id}`)
      .remove()
      .then(() => console.log('Producto eliminado de Realtime Database'))
      .catch((error) => console.error('Error al eliminar en Realtime Database:', error));

    // Eliminar de Firestore
    this.firestore
      .doc(`${categoryPath}/${product.id}`)
      .delete()
      .then(() => {
        this.message = 'Producto eliminado de ambas bases de datos';
        this.fetchProducts();
      })
      .catch((error) => {
        console.error('Error al eliminar en Firestore:', error.code, error.message);
        this.message = `Error al eliminar en Firestore: ${error.message}`;
      });
  }

  // Validar producto
  isValidProduct() {
    return (
      this.currentProduct.name.trim() !== '' &&
      this.currentProduct.price > 0 &&
      this.currentProduct.category.trim() !== '' &&
      this.currentProduct.imageUrl.trim() !== ''
    );
  }

  // Resetear el formulario
  clearForm() {
    this.currentProduct = { name: '', price: 0, description: '', category: '', imageUrl: '' };
    this.isEditing = false;
    this.message = '';
  }

  // Subir imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `images/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (url) => {
                this.currentProduct.imageUrl = url;
                this.message = 'Imagen subida correctamente';
              },
              (error: any) => {
                this.message = 'Error al obtener URL de la imagen: ' + error.message;
              }
            );
          })
        )
        .subscribe(
          () => {
            this.message = 'Subiendo imagen...';
          },
          (error: any) => {
            this.message = 'Error al subir imagen: ' + error.message;
          }
        );
    } else {
      this.message = 'Por favor, selecciona una imagen válida';
    }
  }
}
