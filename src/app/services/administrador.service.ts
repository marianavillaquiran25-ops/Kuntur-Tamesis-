import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador, Ruta, Pago } from '../models/administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  
  // Ajusta esta URL según tu configuración de server.port en Spring Boot
  private apiUrl = 'http://localhost:8090/api/administradores'; 

  constructor(private http: HttpClient) { }

  // --- GESTIÓN DE LA CUENTA DEL ADMINISTRADOR ---

  listarAdmins(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.apiUrl}/listar`);
  }

  crearAdmin(admin: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.apiUrl}/crear`, admin);
  }

  // Recordando la petición de tu profesora: "Eliminar Usuario"
  eliminarUsuario(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/eliminar/${id}`);
  }

  // --- GESTIÓN DE RUTAS (Llamando a los métodos del service Java) ---

  crearRuta(ruta: Ruta): Observable<Ruta> {
    return this.http.post<Ruta>(`${this.apiUrl}/rutas`, ruta);
  }

  editarRuta(id: number, ruta: Ruta): Observable<Ruta> {
    return this.http.put<Ruta>(`${this.apiUrl}/rutas/${id}`, ruta);
  }

  eliminarRuta(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/rutas/${id}`);
  }

  // --- GESTIÓN DE PAGOS Y REPORTES ---

  listarPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/pagos`);
  }

  // Este método llama a verReportes() que devuelve el String con el resumen de Támesis
  obtenerReporteGeneral(): Observable<string> {
    return this.http.get(`${this.apiUrl}/reportes`, { responseType: 'text' });
  }
}