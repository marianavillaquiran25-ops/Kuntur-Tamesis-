import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private apiUrl = 'http://localhost:8090/api/rutas';

  constructor(
    private http: HttpClient
  ) {}

  // Obtener todas las rutas
  obtenerRutas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una ruta por ID
  obtenerRuta(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva ruta
  crearRuta(ruta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ruta);
  }

  // Actualizar una ruta
  actualizarRuta(id: number, ruta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ruta);
  }

  // Eliminar una ruta
  eliminarRuta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}