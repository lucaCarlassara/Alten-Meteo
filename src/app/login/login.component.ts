import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.authenticate(this.username, this.password).subscribe(authenticated => {
      if (authenticated) {
        console.log('Autenticazione riuscita');
        this.loginError = false; // Resetta l'errore se l'autenticazione è riuscita
      } else {
        console.log('Autenticazione fallita');
        this.loginError = true; // Mostra l'errore se l'autenticazione fallisce
      }
    });
  }

  accessMapWithoutLogin() {
    this.authService.setAccessWithoutLogin();
  }
}
