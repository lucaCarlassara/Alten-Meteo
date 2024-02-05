import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'user_data';
  private readonly TOKEN_EXPIRATION_KEY = 'token_expiration';
  isAuthenticated: boolean = false;
  accessWithoutLogin: boolean = false;

  constructor(private http: HttpClient) {
    // Al caricamento dell'applicazione, controlla se ci sono dati salvati
    const userData = localStorage.getItem(this.USER_KEY);
    const tokenExpiration = localStorage.getItem(this.TOKEN_EXPIRATION_KEY);

    if (userData && tokenExpiration) {
      this.isAuthenticated = true;

      const expirationDate = new Date(tokenExpiration);
      const timeRemaining = expirationDate.getTime() - new Date().getTime();

      if (timeRemaining > 0) {
        // Crea un timer per eseguire il logout e visualizzare il componente di login dopo 3 secondi
        setTimeout(() => {
          this.resetAuthentication();
          this.setAccessWithoutLogin();
        }, 1000 * 3600 * 23); // Tempo di scadenza dopo 3 secondi
      } else {
        // Token scaduto, esegui il logout automatico
        this.resetAuthentication();
      }
    }
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>('assets/users.json').pipe(
      map(users => {
        const authenticatedUser = users.find(user => user.username === username && user.password === password);
        if (authenticatedUser) {
          this.isAuthenticated = true;

          // Salva i dati di login nel localStorage
          localStorage.setItem(this.USER_KEY, JSON.stringify(authenticatedUser));

          // Imposta la data di scadenza del token a 3 secondi dopo l'accesso
          const expirationDate = new Date();
          expirationDate.setSeconds(expirationDate.getSeconds() + 3600 * 23);
          localStorage.setItem(this.TOKEN_EXPIRATION_KEY, expirationDate.toISOString());
        } else {
          this.isAuthenticated = false;
        }
        return this.isAuthenticated;
      })
    );
  }

  resetAuthentication() {
    // Resetta l'autenticazione e rimuove i dati salvati
    this.isAuthenticated = false;
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRATION_KEY);
  }

  // Set accessWithoutLogin to true
  setAccessWithoutLogin() {
    this.accessWithoutLogin = true;
  }

  // Reset accessWithoutLogin to false
  resetAccessWithoutLogin() {
    this.accessWithoutLogin = false;
  }

  exit(): void {
    this.resetAccessWithoutLogin();
  }

}
