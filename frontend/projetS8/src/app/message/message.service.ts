import { Injectable } from '@angular/core';
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

export class MessageService {

  constructor(private http: HttpClient) {}

  sendMessage(url: string, data: any): Observable<PhpData> {
    // Reconstituer l'URL complète
    const fullUrl = environment.baseUrl + '/' + url + '.php';

    // Transformation de l'objet data en FormData
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }
    
    // Retourner un objet de type PhpData
    return this.http.post<PhpData>(fullUrl, formData, { withCredentials: true });
  }
}