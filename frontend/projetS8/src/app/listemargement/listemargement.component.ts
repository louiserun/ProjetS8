import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from '../message/message.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

export interface Participant{
  nom: string;
  prenom:string;
  emargement: boolean;
  dateEmargement: Date;
}
@Component({
  selector: 'app-listemargement',
  standalone: true,
  imports: [NavbarComponent, MatFormFieldModule, MatTableModule, MatButtonModule],
  templateUrl: './listemargement.component.html',
  styleUrl: './listemargement.component.scss'
})
export class ListemargementComponent implements OnInit{
  id_ev!: string;
  participants : any;
  dataSource = new MatTableDataSource<Participant>([]);
  columnsToDisplay = ["Nom", "Prenom", "Emargement", "Date"];

  constructor(private service: MessageService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.service.sendMessage('listem', {'id_ev': id}).subscribe(
        (response) => {
          if(response.status == "erreur"){
            console.log("impossible de recupérer la liste d'emargement");
          }
          else{
            this.dataSource.data = response.data;
            // this.participants = response.data.participants;
            // this.dataSource.data = this.participants;
            console.log(response.data);
          }
        }
      )
  }
}
