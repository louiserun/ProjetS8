import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  Nom = 'Runavot'
  Prenom = 'Louise'
  getNom(){
    return this.Nom
  }
  getPrenom(){
    return this.Prenom
  }
}
