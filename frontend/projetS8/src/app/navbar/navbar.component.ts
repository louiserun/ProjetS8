import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService, PhpData } from '../message/message.service';


interface Navbar{
  nom : string;
  prenom : string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [MessageService]
})
export class NavbarComponent implements OnInit{
  navbarData: Navbar = { nom: '', prenom: '' };

  constructor(private messageService: MessageService) {}

  ngOnInit(){
    const url = "getInfoOrganisateur";
    const data = {};
    this.messageService.sendMessage(url, data).subscribe((response: PhpData) => {
      console.log("Réponse du backend :", response); // Afficher la réponse sur la console
      if (response.status === 'ok') {
        const data = response.data
        if (data && Array.isArray(data)&& data.length > 0) {
          const orgaInfo = data[0];
          this.navbarData.nom = orgaInfo.nom;
          this.navbarData.prenom = orgaInfo.prenom;
        }
      }
    })

  }
}
