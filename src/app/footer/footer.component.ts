import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Importa il servizio di autenticazione

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentUser: string;
  lastLoginDate: Date;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Ottieni le informazioni sull'utente corrente e la data dell'ultimo accesso
    this.currentUser = this.authService.getCurrentUser();
    this.lastLoginDate = this.authService.getLastLoginDate();
  }
}
