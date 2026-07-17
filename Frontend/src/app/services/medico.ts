import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicoResponse } from '../model/medico-response';

@Injectable({
  providedIn: 'root',
})
export class Medico {
  private apiURL = 'http://localhost:3000/medicos';

  constructor(private http: HttpClient) {}

  listar(): Observable<MedicoResponse[]> {
    return this.http.get<MedicoResponse[]>(this.apiURL);
  }

  obtener(id: number): Observable<MedicoResponse> {
    return this.http.get<MedicoResponse>(`${this.apiURL}/${id}`);
  }

  guardar(medico: MedicoResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, medico);
  }

  actualizar(id: number, medico: MedicoResponse): Observable<any> {
    return this.http.put(`${this.apiURL}/actualizar/${id}`, medico);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }
}