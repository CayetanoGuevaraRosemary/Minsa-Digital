import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteResponse } from '../model/paciente-response';

@Injectable({
  providedIn: 'root',
})
export class Paciente {
  private apiURL = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<PacienteResponse[]> {
    return this.http.get<PacienteResponse[]>(this.apiURL);
  }

  obtener(id: number): Observable<PacienteResponse> {
    return this.http.get<PacienteResponse>(`${this.apiURL}/eliminar/${id}`);
  }

  guardar(paciente: PacienteResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, paciente);
  }

  actualizar(id: number, paciente: PacienteResponse): Observable<any> {
    return this.http.put(`${this.apiURL}/actualizar/${id}`, paciente);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`)
  }
}