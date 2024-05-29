import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { MessageService, PhpData } from '../message/message.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


interface Projet {
  id_projet: number;
  nom_projet: string;
  description: string;
  date_debut: Date; // ou utilisez le type Date si nécessaire
  date_fin: Date;   // ou utilisez le type Date si nécessaire
  id_organisateur: number;
  evenements: Evenement[];
}

interface Evenement {
  id_evenement: number;
  nom_evenement: string;
  lieu: string;
  date_debut: Date; // ou utilisez le type Date si nécessaire
  date_fin: Date;   // ou utilisez le type Date si nécessaire
  heure_debut: Date; // ou utilisez le type Date si nécessaire
  heure_fin: Date;   // ou utilisez le type Date si nécessaire
  id_projet: number;
}

@Pipe({
  name: 'customTimeFormat'
})

export class CustomTimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Formater la chaîne de caractères de l'heure selon vos besoins
    // Par exemple, supposons que les heures soient au format HH:mm:ss
    const parts = value.split(':');
    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);
    return `${hour}:${minute}`; // Format final: HH:mm
  }
}

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [NavbarComponent, MatTableModule, CommonModule, RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
  providers: [MessageService]
})
export class AccueilComponent implements OnInit {
  projets: Projet[] = [];
  showUpcoming: boolean = true;
  projetsPasses: Projet[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadProjets();
  }

  loadProjets() {
    const url = "getEvenementsProjet";
    const data = {};
    // Envoie d'un message pour obtenir les projets et leurs événements associés
    this.messageService.sendMessage(url, data).subscribe((response: PhpData) => {
      const data = response.data; // Extraire les données de la réponse
      if (response.status === 'ok') {
        if (data && Array.isArray(data)) {
          const currentDate = new Date();
          // Filtrer les projets dont au moins un événement est à venir
          const projetsNonPasses = data.filter((projet: Projet) => {
            if (projet.id_projet === 0) {
              // Pour le projet avec l'ID 0, filtrer les événements à venir
              projet.evenements = projet.evenements.filter((evenement: Evenement) => new Date(evenement.date_fin) > currentDate);
              return false; // Ne pas inclure le projet avec l'ID 0 pour l'instant
            } else {
              // Pour les autres projets, inclure si au moins un événement est à venir
              return projet.evenements.some((evenement: Evenement) => new Date(evenement.date_fin) > currentDate);
            }
          });

          // Ajouter les projets avec l'ID 0 à la fin de la liste
          const projetsIDZero = data.filter((projet: Projet) => projet.id_projet === 0);
          projetsIDZero.forEach((projet: Projet) => {
            // Filtrer les événements à venir
            projet.evenements = projet.evenements.filter((evenement: Evenement) => new Date(evenement.date_fin) > currentDate);
            if (projet.evenements.length > 0) {
              projetsNonPasses.push(projet);
            }
          });

          this.projets = projetsNonPasses;
        }
        console.log('Projets:', this.projets);
      } else {
        console.error('Erreur lors de la récupération des projets:', response);
      }
    }, (error) => {
      console.error('Erreur lors de la récupération des projets:', error);
    });
  }

  loadPastProjectsAndEvents() {
    const url = "getEvenementsProjet";
    const data = {};
    this.messageService.sendMessage(url, data).subscribe((response: PhpData) => {
      const data = response.data;
      if (response.status === 'ok') {
        if (data && Array.isArray(data)) {
          const currentDate = new Date();
          const projetsPasses = data.filter((projet: Projet) => {
            if (projet.id_projet === 0) {
              projet.evenements = projet.evenements.filter((evenement: Evenement) => new Date(evenement.date_fin) <= currentDate);
              return false;
            } else {
              return projet.evenements.some((evenement: Evenement) => new Date(evenement.date_fin) <= currentDate);
            }
          });

          const projetsIDZero = data.filter((projet: Projet) => projet.id_projet === 0);
          projetsIDZero.forEach((projet: Projet) => {
            projet.evenements = projet.evenements.filter((evenement: Evenement) => new Date(evenement.date_fin) <= currentDate);
            if (projet.evenements.length > 0) {
              projetsPasses.push(projet);
            }
          });

          this.projets = projetsPasses;
        }
        console.log('Projets Passés:', this.projets);
      } else {
        console.error('Erreur lors de la récupération des projets:', response);
      }
    }, (error) => {
      console.error('Erreur lors de la récupération des projets:', error);
    });
  }

  toggleView() {
    this.showUpcoming = !this.showUpcoming;
    if (this.showUpcoming) {
      this.loadProjets();
    } else {
      this.loadPastProjectsAndEvents();
    }
  }
  
  }
