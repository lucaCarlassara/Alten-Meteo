import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  private selectedLocationsSubject: BehaviorSubject<{ lat: number, lng: number, date: string }[]> = new BehaviorSubject([]);
  public selectedLocations$: Observable<{ lat: number, lng: number, date: string }[]> = this.selectedLocationsSubject.asObservable();

  updateSelectedLocations(locations: { lat: number, lng: number, date: string }[]): void {
    this.selectedLocationsSubject.next(locations);
  }
}