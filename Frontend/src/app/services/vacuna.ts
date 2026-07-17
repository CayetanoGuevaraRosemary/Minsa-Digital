import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VacunaResponse } from '../model/vacuna-response';

@Injectable({
  providedIn: 'root',
})
export class Vacuna {
  private apiURL = 'http://localhost:3000/vacunas';

  constructor(private http: HttpClient) {}

  listar(): Observable<VacunaResponse[]> {
    return this.http.get<VacunaResponse[]>(this.apiURL);
  }

  listarPorPaciente(idPaciente: number): Observable<VacunaResponse[]> {
    return this.http.get<VacunaResponse[]>(`${this.apiURL}/paciente/${idPaciente}`);
  }

  guardar(vacuna: VacunaResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, vacuna);
  }
}