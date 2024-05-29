import { Component, OnInit } from '@angular/core';
import { MessageService, PhpData } from '../message/message.service';
import QRCode from 'qrcode';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-generer-qrcode',
  standalone: true,
  imports: [],
  templateUrl: './generer-qrcode.component.html',
  styleUrl: './generer-qrcode.component.scss',
  providers: [MessageService]
})
export class GenererQrcodeComponent implements OnInit {
  qrCodeURL: string = '';
  id_evenement: string = '';

  constructor(
    private messageService: MessageService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id_evenement');
    this.id_evenement = id === null ? '' : id;

    const url = "getEvenementById";
    const data = { id_evenement: this.id_evenement };
    // Suppose eventDetailsService contient les détails de l'événement, y compris l'URL de confirmation de présence
    this.messageService.sendMessage(url, data).subscribe((response: PhpData) => {
      if (response.status === 'ok') {
        const eventDetails = response.data; // Obtenez les détails de l'événement depuis la réponse
        const baseUrl = window.location.origin; // Récupérer l'URL de base de l'application
        const relativePath = '/conf-pres'; // Chemin relatif vers le composant de confirmation de présence
        const confirmationURL = `${baseUrl}${relativePath}/${this.id_evenement}`;
        console.log("confirmationUrl : ", confirmationURL);
        // Générez le contenu du QR code (URL de confirmation de présence)
        this.qrCodeURL = confirmationURL;
        console.log("Url : ", this.qrCodeURL);

        // Générez le QR code à partir de l'URL
        QRCode.toCanvas(document.getElementById('canvas'), this.qrCodeURL, function (error) {
          if (error) console.error(error);
          console.log('QR Code generated successfully');
        });
      } else {
        console.error('Erreur lors de la récupération des détails de l\'événement:', response);
      }
    }, (error) => {
      console.error('Erreur lors de la récupération des détails de l\'événement:', error);
    });
  }
}
