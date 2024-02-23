import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { MapDataService } from '../map-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapMenu') mapMenu: ElementRef;
  public showMenu = false;

  private selectedLocations: { lat: number, lng: number, date: string }[] = [];

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  private map;

  private markersData = [
    { name: 'Lisbon', lat: 38.71667, lng: -9.13333 },
    { name: 'Madrid', lat: 40.41667, lng: -3.70222 },
    { name: 'Paris', lat: 48.85333, lng: 2.34583 },
    { name: 'Brussels', lat: 50.85028, lng: 4.34861 },
    { name: 'Amsterdam', lat: 52.37444, lng: 4.89861 },
    { name: 'Luxembourg', lat: 49.61167, lng: 6.13194 },
    { name: 'Nicosia', lat: 35.17528, lng: 33.35833 },
    { name: 'Rome', lat: 41.89167, lng: 12.51167 },
    { name: 'Valletta', lat: 35.89944, lng: 14.51444 },
    { name: 'Vienna', lat: 48.20833, lng: 16.37306 },
    { name: 'Berlin', lat: 52.52472, lng: 13.41278 },
    { name: 'Warsaw', lat: 52.22972, lng: 21.01222 },
    { name: 'Copenhagen', lat: 55.67556, lng: 12.56556 },
    { name: 'Stockholm', lat: 59.3325, lng: 18.06417 },
    { name: 'Riga', lat: 56.94583, lng: 24.10556 },
    { name: 'Vilnius', lat: 54.68833, lng: 25.27278 },
    { name: 'Tallinn', lat: 59.43694, lng: 24.75361 },
    { name: 'London', lat: 51.50833, lng: -0.12583 },
    { name: 'Dublin', lat: 53.33306, lng: -6.24889 },
    { name: 'Bucharest', lat: 44.43222, lng: 26.10611 },
    { name: 'Athens', lat: 37.97944, lng: 23.71583 },
    { name: 'Zagreb', lat: 45.81472, lng: 15.97778 },
    { name: 'Ljubljana', lat: 46.05083, lng: 14.50833 },
    { name: 'Budapest', lat: 47.4975, lng: 19.04083 },
    { name: 'Prague', lat: 50.08722, lng: 14.42139 },
    { name: 'Bratislava', lat: 48.14861, lng: 17.1075 },
    { name: 'Helsinki', lat: 60.16972, lng: 24.93583 },
    { name: 'Moscow', lat: 55.75583, lng: 37.6176 },
    { name: 'Berna', lat: 46.8182, lng: 8.2275 },
    { name: 'Oslo', lat: 59.9139, lng: 10.7522 },
    { name: 'Reykjavik', lat: 64.1466, lng: -21.9426 },
    { name: 'Sarajevo', lat: 43.8563, lng: 18.4131 },
    { name: 'Tirana', lat: 41.3275, lng: 19.8187 },
    { name: 'Kiev', lat: 50.4501, lng: 30.5234 },
    { name: 'Tunis', lat: 36.80667, lng: 10.18167 },
    { name: 'Ankara', lat: 39.93333, lng: 32.86667 },
    { name: 'Andorra la Vella', lat: 42.5063, lng: 1.5218 },
    { name: 'Monaco', lat: 43.7322, lng: 7.4186 },
    { name: 'Vaduz', lat: 47.14167, lng: 9.52167 },
    { name: 'Belgrade', lat: 44.80401, lng: 20.46513 },
    { name: 'Podgorica', lat: 42.43042, lng: 19.25936 },
    { name: 'Sofia', lat: 42.69751, lng: 23.32415 },
    { name: 'Skopje', lat: 42.00236, lng: 21.4361 },
    { name: 'Chisinau', lat: 47.0167, lng: 28.8497 },
    { name: 'Cairo', lat: 30.033, lng: 31.2336 },
    { name: 'Tripoli', lat: 32.8872, lng: 13.1913 },
    { name: 'Algiers', lat: 36.75278, lng: 3.04222 },
    { name: 'Riyadh', lat: 24.7136, lng: 46.6753 },
    { name: 'Tehran', lat: 35.6895, lng: 51.3890 },
    { name: 'Baghdad', lat: 33.3152, lng: 44.3661 },
    { name: 'Jerusalem', lat: 31.7683, lng: 35.2137 },
    { name: 'Amman', lat: 31.9496, lng: 35.9328 },
    { name: 'Beirut', lat: 33.8886, lng: 35.4955 },
    { name: 'Damascus', lat: 33.5138, lng: 36.2765 },
    { name: 'Torshavn', lat: 62.0079, lng: -6.7734 },
    { name: 'Casablanca', lat: 33.5731, lng: -7.5898 },
    { name: 'Tbilisi', lat: 41.7151, lng: 44.8271 },
    { name: 'Yerevan', lat: 40.1772, lng: 44.5035 },
    { name: 'Baku', lat: 40.4093, lng: 49.8671 },
  ];


  private currentCircleMarker: L.CircleMarker;

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.4642, 9.1895],
      zoom: 5
    });

    const standardTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

  const satelliteTiles = L.tileLayer('https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2018_3857/default/g/{z}/{y}/{x}.jpg', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="https://s2maps.eu/">Sentinel-2 cloudless - https://s2maps.eu/</a>',
  });

  // Crea un oggetto con i livelli disponibili
  const baseMaps = {
    'Standard': standardTiles,
    'Satellite': satelliteTiles,
  };

  // Aggiungi il livello standard come predefinito
  standardTiles.addTo(this.map);

  // Aggiungi il controllo per cambiare tra i livelli
  L.control.layers(baseMaps).addTo(this.map);

    // Aggiungi i marker custom sulla mappa
    this.addMarkers();

    this.map.on('click', (event) => {
      const latlng = event.latlng;
  
      // Rimuovi il CircleMarker corrente se esiste
      if (this.currentCircleMarker) {
        this.map.removeLayer(this.currentCircleMarker);
      }
  
      // Crea un CircleMarker nel punto in cui l'utente ha fatto clic
      const circleMarker = L.circleMarker(latlng, {
        radius: 6,
        color: 'red',
        fillColor: 'orange',
        fillOpacity: 0.8,
      });
  
      // Aggiungi il CircleMarker alla mappa
      circleMarker.addTo(this.map);
  
      // Crea un popup con le coordinate e apri il popup
      const popupContent = `<div style='font-size: 14px;'>Lat: ${latlng.lat.toFixed(4)}<br>Lng: ${latlng.lng.toFixed(4)}</div>`;
      circleMarker.bindPopup(popupContent).openPopup();
  
      // Aggiorna il riferimento al CircleMarker corrente
      this.currentCircleMarker = circleMarker;
      this.addLocation(latlng);
    });

    // Crea un gruppo di livelli per gestire il cambio tra i livelli
    
  }

  private addMarkers(): void {
    // Ordina l'array markersData in base al nome della capitale (in modo alfabetico)
    this.markersData.sort((a, b) => a.name.localeCompare(b.name));
  
    this.markersData.forEach(markerData => {
      const marker = L.circleMarker([markerData.lat, markerData.lng], {
        radius: 5,
        fillColor: 'blue',
        fillOpacity: 1,
        weight: 2,
        opacity: 1,
      });
  
      marker.bindPopup(`<div style='font-size: 14px;'>${markerData.name}<br>Lat: ${markerData.lat.toFixed(4)}<br>Lng: ${markerData.lng.toFixed(4)}</div>`);
  
      // Aggiungi un ascoltatore di clic a ciascun marker
      marker.on('click', (event) => {
        this.handleMarkerClick(event);
      });
  
      marker.addTo(this.map);
    });
  }

  private handleMarkerClick(event): void {
    const latlng = event.latlng;
  
    // Aggiungi le coordinate al tuo array selectedLocations
    this.addLocation(latlng);
  }

  selectCapital(capital): void {
    // Trova il marker corrispondente nella mappa
    const selectedMarker = this.markersData.find(marker => marker.name === capital.name);
  
    // Se il marker esiste, apri il popup
    if (selectedMarker) {
      const latlng = L.latLng(selectedMarker.lat, selectedMarker.lng);

      this.addLocation(latlng);
  
      // Trova il marker nella mappa
      const marker = this.findMarkerByLatLng(latlng);
  
      // Se il marker esiste, apri il popup
      if (marker) {
        marker.openPopup();
      }
    }
  }

  private findMarkerByLatLng(latlng: L.LatLng): L.Layer {
    for (const layer of Object.values(this.map._layers)) {
      if (layer instanceof L.CircleMarker || layer instanceof L.Marker) {
        const marker = layer as L.CircleMarker | L.Marker;
        if (marker.getLatLng().equals(latlng)) {
          return marker;
        }
      }
    }
    return null;
  }

  getSelectedLocations(): { lat: number, lng: number }[] {
    return this.selectedLocations;
  }
  

  constructor(private mapDataService: MapDataService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  addLocation(latlng: L.LatLng): void {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    
    // Formatta l'ora, i minuti e i secondi come stringa con due cifre
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    const newLocation = {
      lat: latlng.lat.toFixed(4),
      lng: latlng.lng.toFixed(4),
      date: formattedTime
    };
  
    // Verifica se il numero di elementi supera 10
    if (this.selectedLocations.length >= 10) {
        // Se sì, rimuovi il primo elemento (politica FIFO)
        this.selectedLocations.shift();
    }
  
    // Aggiungi il nuovo elemento
    this.selectedLocations.push(newLocation);
    this.mapDataService.updateSelectedLocations(this.selectedLocations);
    console.log(this.selectedLocations);
}
}
