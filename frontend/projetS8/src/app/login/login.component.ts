import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  username = "";
  password = "";

  errorMessage: string = ''; // Initialisation avec une chaîne vide

  url = '';
  
  constructor(private serviceAuth: AuthService, private router: Router) {
  }

  login() {
    const data = {
      username: this.username,
      password: this.password
    };

    // Définir la baseUrl avant d'appeler sendMessage
    this.serviceAuth.sendAuthentification(this.username, this.password).subscribe((response) => {
      this.serviceAuth.finalizeAuthentification(response);
      if (response.status === 'error') {
        this.errorMessage = response.data.reason;
        console.log(response.status);
      } else {
        // Authentification réussie, rediriger vers la page des cours
        this.router.navigateByUrl('/accueil');
      }
    });
  }
}
