import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitaResponse } from '../model/cita-response';

@Injectable({
  providedIn: 'root',
})
export class Cita {
  private apiURL = 'http://localhost:3000/citas';

  constructor(private http: HttpClient) {}

  listar(): Observable<CitaResponse[]> {
    return this.http.get<CitaResponse[]>(this.apiURL);
  }

  listarPorPaciente(idPaciente: number): Observable<CitaResponse[]> {
    return this.http.get<CitaResponse[]>(`${this.apiURL}/paciente/${idPaciente}`);
  }

  guardar(cita: CitaResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, cita);
  }

  actualizarEstado(id: number, estado_cita: string): Observable<any> {
    return this.http.put(`${this.apiURL}/estado/${id}`, { estado_cita });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }
}