import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from '../message/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';


interface EventDetails {
  nom_ev: string;
  lieu: string;
  date_deb: string;
  date_fin: string;
  heure_deb: string;
  heure_fin: string;
  participant_tab: any; // Ajustez ceci selon la structure des participants
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

  enableUpload = false;
  erreur = "";

  jsonData : any;
  jsoncreaev: EventDetails = {
    nom_ev: '',
    lieu: '',
    date_deb: '',
    date_fin: '',
    heure_deb: '',
    heure_fin: '',
    participant_tab: null
  };

  constructor(private messageService: MessageService, private router:Router){}

  onClick(){
    this.date_debut = this.debutev.substring(0,10);
    this.heure_debut = this.debutev.substring(this.debutev.length - 5) + ":00";
    this.date_fin = this.finev.substring(0,10);
    this.heure_fin = this.finev.substring(this.finev.length - 5) + ":00";
  }


  onFileSelected(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    //Si plusieurs fichiers
    if(target.files.length != 1){
      this.erreur = 'Cannot use multiple files';
      console.log(this.erreur);
      this.enableUpload = false;

    }
    else{
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        /* read workbook */
        const arrayBuffer: ArrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const wb: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        this.jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

  
        console.log(this.jsonData);
        console.log(this.jsonData["0"][0]);
        if((this.jsonData["0"][0] === "Prenom" && this.jsonData["0"][1] === "Nom") || (this.jsonData["0"][0] === "Nom" && this.jsonData["0"][1] ==="Prenom")){
          
          this.enableUpload = true;
        }
        else{
          this.enableUpload = false;
        }

  
      };
      reader.readAsArrayBuffer(target.files[0]);    
    }

  
  }

  onSubmit(){
    this.date_debut = this.debutev.substring(0,10);
    this.heure_debut = this.debutev.substring(this.debutev.length - 5) + ":00";
    this.date_fin = this.finev.substring(0,10);
    this.heure_fin = this.finev.substring(this.finev.length - 5) + ":00";

    if(this.enableUpload){
      this.jsoncreaev["nom_ev"] = this.nom_evenement;
      this.jsoncreaev["lieu"] = this.lieu;
      this.jsoncreaev["date_deb"] = this.date_debut;
      this.jsoncreaev["date_fin"] = this.date_fin;
      this.jsoncreaev["heure_deb"] = this.heure_debut;
      this.jsoncreaev["heure_fin"] = this.heure_fin;

      this.jsoncreaev["participant_tab"] = this.jsonData;


      this.messageService.sendMessage("creaEv",  this.jsoncreaev).subscribe(
        (response) => {
          if(response.status == "erreur"){
            this.erreur = response.data.reason;
          }
          else{
            console.log("création d'événement réussi");
            this.router.navigateByUrl('/creaevreussi');
          }
          
        }
        )

      console.log(this.jsoncreaev);
    }
    else{
      console.log("Impossible d'importer le fichier excel");
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


}
