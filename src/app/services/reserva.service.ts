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
    return this.http.post<any>(this.apiUrl, datos);
  }

  // OBTENER TODAS LAS RESERVAS
  obtenerReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ELIMINAR UNA RESERVA
  eliminarReserva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
          