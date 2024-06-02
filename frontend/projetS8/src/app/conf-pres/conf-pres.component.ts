import { Component, OnInit } from '@angular/core';
import { MessageService, PhpData } from '../message/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-conf-pres',
  standalone: true,
  imports: [CommonModule, DatePipe,FormsModule ],
  templateUrl: './conf-pres.component.html',
  styleUrl: './conf-pres.component.scss'
})
export class ConfPresComponent implements OnInit {
  id_evenement: string = '';
  token: string = '';
  evenement: Evenement | undefined;
  nom: string = '';
  prenom: string = '';
  url3: string = 'confirmPres';

  constructor(
    private messageService: MessageService, 
    private route: ActivatedRoute,
    private router: Router
  ) {} 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id_evenement = params.get('id_evenement') || '';
    });
    console.log("id: ", this.id_evenement);
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token') || '';
    }); 

    // if (this.id_evenement) {
      const data = {
        token: this.token
      };
      const data2 = {
        id_evenement: this.id_evenement
      };
      const url : string = 'verifyToken';
      const url2 : string = 'getEvenementById2';
      console.log("data : ", data);
      this.messageService.sendMessage(url, data).subscribe(
        (response: PhpData) => {
          if (response.status === 'ok') {
            console.log('Token validé avec succès.');
            this.messageService.sendMessage(url2, data2).subscribe((response: PhpData) => {
              if (response.status === 'ok') {
                console.log("ok ");
                this.evenement = response.data;
              } else {
                console.error('Échec de récupération des informations sur l\'événement');
              }
            },
            error => {
              console.error('Erreur lors de la récupération des informations sur l\'événement: ', error);
            }
          );
          } else {
            console.log('Échec de la validation du token: ', response.data.message);
            this.router.navigate(['/error']);
          }
        },
        error => {
          console.error('Erreur lors de la validation du token: ', error);
          this.router.navigate(['/error']);
        }
      );
  } 

  confirmPresence() {
    const data = {
        id_evenement: this.id_evenement,
        nom: this.nom,
        prenom: this.prenom
    };
    const url: string = 'confirmPres';
    this.messageService.sendMessage(url, data).subscribe((response: PhpData) => {
        const data = response.data; 
        console.log("status:", response.status);
        if (response.status === 'ok') {
            if (data === 1) {
                console.log('Confirmation de présence enregistrée avec succès.');
                // Rediriger vers une autre page ou afficher un message de confirmation
            } else {
                console.error('Échec de la confirmation de présence: ', response.data.message);
                // Afficher un message d'erreur ou rediriger vers une autre page
            }
        } else {
            console.error('Échec de la confirmation de présence: ', response.data.message);
            // Afficher un message d'erreur ou rediriger vers une autre page
        }
    },
    error => {
        console.error('Erreur lors de la confirmation de présence: ', error);
        // Afficher un message d'erreur ou rediriger vers une autre page
    });
  }
}
