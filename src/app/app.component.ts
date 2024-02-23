import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  resetAuthentication() {
    this.authService.resetAuthentication();
  }

  exit(): void {
    this.authService.exit();
  }

  ngOnInit(){
    // Esegui la ricarica della pagina ogni 5 secondi (5000 millisecondi)
    setInterval(() => {
      location.reload();
    }, 1000 * 3600 * 24);
  }

  showHistory = false;

  toggleHistoryVisibility(): void {
    this.showHistory = !this.showHistory;
  }

}
