import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MessageService } from '../message/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';



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

  enableUpload = true;
  erreur = "";

  jsonData : any;

  constructor(private messageService: MessageService){}

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

      const formData: FormData = new FormData();
      formData.append('fileData', JSON.stringify(this.jsonData));


    };
    reader.readAsArrayBuffer(target.files[0]);  
  
  }

  onSubmit(){
    if(this.enableUpload){
        
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
