import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface PhpData {
  status: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean = false;

  constructor(private messageService: MessageService, private http: HttpClient) {
   }

   sendAuthentification(login: string, password: string) : Observable<PhpData>{
      const urlcomplete = environment.baseUrl + '/checkLogin.php';
      const formdata = new FormData();
      formdata.append('username', login);
      formdata.append('password', password);
      return this.http.post<PhpData>(urlcomplete, formdata, {withCredentials: true});
   }

   finalizeAuthentification(message: PhpData){
    if(message.status == "ok"){
      this.isAuth = true;
    }
    else{
      this.isAuth = false;
    }
   }
}
