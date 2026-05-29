import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  private apiUrl = 'http://localhost:8089/api/reservas';

  constructor(private http: HttpClient) {}

  // CREAR RESERVA
  crearReserva(datos: any): Observable<any> {

    return this.http.post(this.apiUrl, datos);

  }

}