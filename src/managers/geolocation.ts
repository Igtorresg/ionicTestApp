import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private storageService: StorageService) {}

  // 1. Función para obtener la ubicación actual
  async getLocation(): Promise<any> {
    try {
      const position = await Geolocation.getCurrentPosition();
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
      };
      
      // Retornar la ubicación obtenida
      this.saveLocation(locationData);
      return locationData;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      return null; // Devuelve null en caso de error
    }
  }

  // Función para guardar la ubicación
  async saveLocation(locationData: any): Promise<void> {
    try {
      await this.storageService.set('savedLocation', locationData);
      console.log('Ubicación guardada correctamente');
    } catch (error) {
      console.error('Error al guardar la ubicación:', error);
    }
  }

  // Función para abrir Google Maps con la ubicación actual y una predeterminada
  openGoogleMaps(currentLatitude: number, currentLongitude: number): void {
    const destinationLatitude = -33.0089245; // Ejemplo: latitud de la ubicación destino (Mall Marina)
    const destinationLongitude = -71.5482706; // Ejemplo: longitud de la ubicación destino

    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}&travelmode=driving`;
    window.open(url, '_system'); // Esto abre Google Maps en una nueva ventana del navegador
  }

  //Crear un if para que dependiendo la sucursal elegida se abran diferentes destinos

  // Función para recuperar la ubicación guardada
  async getSavedLocation() {
    try {
      const savedLocation = await this.storageService.get('savedLocation');
      if (savedLocation) {
        console.log('Ubicación recuperada:', savedLocation);
        return savedLocation;
      } else {
        console.log('No se encontró ubicación guardada');
        return null;
      }
    } catch (error) {
      console.error('Error al recuperar la ubicación:', error);
      return null;
    }
  }

  // Función para eliminar la ubicación guardada
  async removeSavedLocation() {
    try {
      await this.storageService.remove('savedLocation');
      console.log('Ubicación eliminada correctamente.');
    } catch (error) {
      console.error('Error al eliminar la ubicación:', error);
    }
  }
}
