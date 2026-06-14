import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8090/api/turistas';

  constructor(private http: HttpClient) {}

  login(datos: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      datos
    );
  }

  registrar(datos: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      datos
    );
  }

}