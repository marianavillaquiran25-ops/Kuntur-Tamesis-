import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private turistaUrl = 'http://localhost:8090/api/turistas';
  private usuarioUrl = 'http://localhost:8090/api/usuarios'; // 👈 Usaremos esta ruta para el login global

  constructor(private http: HttpClient) {}

  // 🔄 LOGIN GLOBAL: Ahora apunta a /api/usuarios/login
  login(datos: any): Observable<any> {
    return this.http.post(
      `${this.usuarioUrl}/login`,
      datos
    );
  }

  // REGISTRO (Este sí se queda en turistas, porque los empleados los creas tú desde el panel)
  registrar(datos: any): Observable<any> {
    return this.http.post(
      `${this.turistaUrl}/register`,
      datos
    );
  }

  // BUSCAR USUARIO POR CORREO
  obtenerUsuarioPorCorreo(correo: string): Observable<any> {
    return this.http.get(
      `${this.usuarioUrl}/correo/${correo}`
    );
  }
}