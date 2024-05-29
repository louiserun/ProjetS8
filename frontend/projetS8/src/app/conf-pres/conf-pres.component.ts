import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conf-pres',
  standalone: true,
  imports: [],
  templateUrl: './conf-pres.component.html',
  styleUrl: './conf-pres.component.scss'
})
export class ConfPresComponent implements OnInit {
  id_evenement: string = '';
  constructor(
    private messageService: MessageService, 
    private route: ActivatedRoute
  ) {
    this.messageService.setBaseUrl("http://127.0.0.1:80/ProjetS8/backend");
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id_evenement');
    this.id_evenement = id === null ? '' : id;

    const url = "getEvenementById";
    const data = { id_evenement: this.id_evenement };
  }
}
