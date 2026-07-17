import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetaDetalleResponse, RecetaResponse } from '../model/receta-response';

@Injectable({
  providedIn: 'root',
})
export class Receta {
  private apiURL = 'http://localhost:3000/recetas';

  constructor(private http: HttpClient) {}

  listar(): Observable<RecetaResponse[]> {
    return this.http.get<RecetaResponse[]>(this.apiURL);
  }

  listarPorPaciente(idPaciente: number): Observable<RecetaResponse[]> {
    return this.http.get<RecetaResponse[]>(`${this.apiURL}/paciente/${idPaciente}`);
  }

  guardar(receta: RecetaResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, receta);
  }

  obtenerDetalle(idReceta: number): Observable<RecetaDetalleResponse[]> {
    return this.http.get<RecetaDetalleResponse[]>(`${this.apiURL}/detalle/${idReceta}`);
  }

  guardarDetalle(detalle: RecetaDetalleResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/detalle/guardar`, detalle);
  }
}