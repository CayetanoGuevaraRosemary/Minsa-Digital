import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenciaResponse } from '../model/referencia-response';

@Injectable({
  providedIn: 'root',
})
export class Referencia {
  private apiURL = 'http://localhost:3000/referencias';

  constructor(private http: HttpClient) {}

  listar(): Observable<ReferenciaResponse[]> {
    return this.http.get<ReferenciaResponse[]>(this.apiURL);
  }

  listarPorPaciente(idPaciente: number): Observable<ReferenciaResponse[]> {
    return this.http.get<ReferenciaResponse[]>(`${this.apiURL}/paciente/${idPaciente}`);
  }

  guardar(referencia: ReferenciaResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, referencia);
  }

  actualizarEstado(id: number, estado_referencia: string): Observable<any> {
    return this.http.put(`${this.apiURL}/estado/${id}`, { estado_referencia });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }
}