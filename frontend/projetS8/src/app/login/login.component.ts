import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, PhpData } from '../message/message.service'; // Importer le service
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  username = "";
  password = "";

  errorMessage: string = ''; // Initialisation avec une chaîne vide

  constructor(private messageService: MessageService, private router: Router) {
    this.messageService.setBaseUrl("http://127.0.0.1:80/ProjetS8/backend");
  }

  onLoginClick() {
    const url = "checkLogin";
    const data = {
      username: this.username,
      password: this.password
    };

    // Définir la baseUrl avant d'appeler sendMessage
    this.messageService.sendMessage(url, data).subscribe((response: PhpData) => {
      console.log('Response:', response);
      if (response.status === 'error') {
        this.errorMessage = response.data.reason || ''; // Utilisation d'une chaîne vide par défaut si response.data.reason est undefined
      } else {
        // Authentification réussie, rediriger vers la page des cours
        this.router.navigateByUrl('/accueil');
      }
    });
  }
}
