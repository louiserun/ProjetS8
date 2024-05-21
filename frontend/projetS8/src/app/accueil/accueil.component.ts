import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { MessageService, PhpData } from '../message/message.service';
import { MatTableModule } from '@angular/material/table';

interface Evenements {
  nom_evenement: string;
  lieu: string;
  date_debut : Date;
  date_fin : Date;
  heure_debut : number;
  heure_fin: number;
}

const EVENEMENT_DATA: Evenements[]=[]

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [NavbarComponent, MatTableModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
  providers: [MessageService]
})
export class AccueilComponent implements OnInit{
  evenements: Evenements[] = []; 
  displayedColumns: string[] = ['nom_evenement', 'lieu','date_debut', 'date_fin', 'heure_debut', 'heure_fin'];
  dataSource = EVENEMENT_DATA;

  constructor(private messageService: MessageService) {
    this.messageService.setBaseUrl("http://127.0.0.1:80/ProjetS8/backend");
  }
  ngOnInit() {
    const url = "getEvenements";
    const data = {};
    this.messageService.sendMessage(url, data).subscribe((response: PhpData) => {
      if (response.status === 'ok') {
        const data = response.data; // Extraire les données de la réponse
        if (data && Array.isArray(data)) {
          this.evenements = data.map((evenements: any) => ({
            nom_evenement: evenements.nom_evenement,
            lieu: evenements.lieu,
            date_debut: evenements.date_debut,
            date_fin: evenements.date_fin,
            heure_debut: evenements.heure_debut,
            heure_fin : evenements.heure_fin
          })); // Vérifier si les données sont un tableau
          this.dataSource = this.evenements;          
          console.log('Evenements:', this.evenements);
        } else {
          console.error('Erreur lors de la récupération des évènements:', 'Données invalides');
        }
      } else {
        console.error('Erreur lors de la récupération des évènements:', response.data.reason);
      }
    })
  }

}
