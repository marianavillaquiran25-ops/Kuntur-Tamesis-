import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Turista} from '../models/turista.model';
import {environment} from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})

export class TuristaService{
    private baseUrl=`${environment.apiUrl}/turista`;
    
    constructor(private http:HttpClient){}
    
    listar(): Observable<Turista[]> {
        return this.http.get<Turista[]>(this.baseUrl);
    }
    
    obtenerPorId(id:number):Observable<Turista>{
        return this.http.get<Turista>(`${this.baseUrl}/${id}`);
    }

    buscarPorDocumento(documento:string):Observable<Turista>{
        return this.http.get<Turista>(`${this.baseUrl}/documento`, {
            params: {documento}
        });
    }

    crear(turista:Turista):Observable<Turista>{
        return this.http.post<Turista>(this.baseUrl, turista);
    }

    actualizar(id:number,turista:Turista):Observable<Turista>{
        return this.http.put<Turista>(`${this.baseUrl}/${id}`, turista);
    }

    eliminar(id:number):Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}