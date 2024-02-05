import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent {
  @Input() searchHistory: any[]; // Array di ricerche
  @Output() sortChanged = new EventEmitter<string>(); // Evento per cambio ordinamento
  @Output() searchChanged = new EventEmitter<string>(); // Evento per cambio ricerca

  // Metodo per emettere l'evento di cambio ordinamento
  changeSortOrder(order: string): void {
    this.sortChanged.emit(order);
  }

  // Metodo per emettere l'evento di cambio ricerca
  changeSearchQuery(query: string): void {
    this.searchChanged.emit(query);
  }
}