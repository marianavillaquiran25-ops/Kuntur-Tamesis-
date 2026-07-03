
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  private apiUrl = 'http://localhost:8090/api/guias';

  constructor(private http: HttpClient) {}

  listarGuias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  actualizarDisponibilidad(
    id: number,
    disponible: boolean
  ) {
    return this.http.put(
      `${this.apiUrl}/${id}/disponibilidad?disponible=${disponible}`,
      {}
    );
  }
}

