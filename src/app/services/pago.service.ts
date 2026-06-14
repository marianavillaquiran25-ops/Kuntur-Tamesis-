import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'http://localhost:8090/api/pagos';

  constructor(private http: HttpClient) {}

  obtenerPagos() {
    return this.http.get<any[]>(this.apiUrl);
  }

}