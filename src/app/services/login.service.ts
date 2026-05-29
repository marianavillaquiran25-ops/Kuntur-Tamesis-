import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  // URL BACKEND
  private apiUrl = 'http://localhost:8090/api/usuarios';

  constructor(
    private http: HttpClient
  ) {}

  // OBTENER USUARIOS
  obtenerUsuarios(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }

  // REGISTRAR USUARIO
  registrar(datos: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, datos);

  }

}