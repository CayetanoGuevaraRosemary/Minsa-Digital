import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspecialidadResponse } from '../model/especialidad-response';

@Injectable({
  providedIn: 'root',
})
export class Especialidad {
  private apiURL = 'http://localhost:3000/especialidades';

  constructor(private http: HttpClient) {}

  listar(): Observable<EspecialidadResponse[]> {
    return this.http.get<EspecialidadResponse[]>(this.apiURL);
  }

  guardar(especialidad: EspecialidadResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, especialidad);
  }
}