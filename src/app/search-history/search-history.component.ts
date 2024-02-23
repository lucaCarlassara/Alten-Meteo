import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../map-data.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  selectedLocations: { lat: number, lng: number, date: string }[] = [];

  // Dichiarazione della proprietà searchQuery
  searchQuery: string = '';

  // Dichiarazione della proprietà filteredLocations
  filteredLocations: { lat: number, lng: number, date: string }[] = [];

  constructor(private mapDataService: MapDataService) {}

  filterSearchHistory(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredLocations = [...this.selectedLocations];
    } else {
      const query = this.searchQuery.trim().toLowerCase();
  
      this.filteredLocations = this.selectedLocations.filter(location => {
        const lat = location.lat.toString().toLowerCase();
        const lng = location.lng.toString().toLowerCase();
  
        console.log(this.filteredLocations)
        // Controlla se la coordinata inizia con la stringa di ricerca
        return lat.startsWith(query) || lng.startsWith(query);
      });
    }
  }

  ngOnInit(): void {
    // Sottoscriviti agli aggiornamenti di selectedLocations
    this.mapDataService.selectedLocations$.subscribe(locations => {
      this.selectedLocations = locations;
      // Puoi eseguire qui altre azioni quando selectedLocations viene aggiornato
    });
  }

  sortAscending(): void {
    this.filteredLocations.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
    this.selectedLocations.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
  }
  
  sortDescending(): void {
    this.filteredLocations.sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
    this.selectedLocations.sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
  }
  
}