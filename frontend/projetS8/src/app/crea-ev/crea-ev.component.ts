import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from '../message/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Participant {
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-crea-ev',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './crea-ev.component.html',
  styleUrl: './crea-ev.component.scss'
})
export class CreaEvComponent {
  nom_evenement = "";
  debutev = "";
  finev = "";
  date_debut = "";
  date_fin = "";
  heure_debut = "";
  heure_fin = "";
  lieu = "";

  filecontent: any;
  enableUpload = true;

  participants_tab : Participant[] = [];

  erreur = "";

  constructor(private messageService: MessageService){}

  onClick(){
    this.date_debut = this.debutev.substring(0,10);
    this.heure_debut = this.debutev.substring(this.debutev.length - 5) + ":00";
    this.date_fin = this.finev.substring(0,10);
    this.heure_fin = this.finev.substring(this.finev.length - 5) + ":00";
  }


  onFileSelected(event: any) {
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.filecontent = e.target.result;
    };
    reader.readAsArrayBuffer(event.target.files[0]);
    
    this.enableUpload = true;
    console.log("coucou");
  }

  onSubmit(){
    if(this.enableUpload){

      const file = {"file": this.filecontent};

      console.log(file);
      this.messageService.sendMessage("fichier", file).subscribe(
        (response) => {
          if(response.status == "error"){
            console.log(response.data.reason);
          }
          else{
            console.log(response.data);
          }
        }
      )
    }
    else{
      console.log("Enabled Upload.");
    }
  }
}
    // if(this.nom_evenement == ""){
    //   console.log("Pas de nom d'évènement");
    //   //afficher un message dans le front
    // }

// $nomEv = $_POST['nom_ev'];
// $lieu = $_POST['lieu'];
// $date_deb = $_POST['date_deb'];
// $date_fin = $_POST['date_fin'];
// $heure_deb = $_POST['heure_deb'];
// $heure_fin = $_POST['heure_fin'];
// $id_projet = $_POST['id_projet'];
// $participants_json = $_POST['participants_tab'];
    // else{
    //   //this.messageService.sendMessage('creaEv',{'nom_ev':this.nom_evenement, 'lieu':this.lieu, 'date_deb':this.date_debut, 'date_fin':this.date_fin, 'heure_deb':this.})
    // }



