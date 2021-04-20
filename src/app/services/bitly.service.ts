import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitlyService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + environment.bitlyToken
    })
  };

  endPoint = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  shortenLink(url: string) {
    const payload = { long_url: url };
    return this.http.post(this.endPoint, payload, this.httpOptions);
  }

}
