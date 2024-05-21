import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PhpData {
  status: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private baseUrl = '' // Déclaration de la propriété baseUrl

  constructor(private http: HttpClient) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  sendMessage(url: string, data: any): Observable<PhpData> {
    if (!this.baseUrl) {
      throw new Error("Base URL is not set. Please call setBaseUrl() before calling sendMessage().");
    }
    // Reconstituer l'URL complète
    const fullUrl = `${this.baseUrl}/${url}.php`;

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