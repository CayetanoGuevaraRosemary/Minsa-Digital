import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstablecimientoResponse } from '../model/establecimiento-response';

@Injectable({
  providedIn: 'root',
})
export class Establecimiento {
  private apiURL = 'http://localhost:3000/establecimientos';

  constructor(private http: HttpClient) {}

  listar(): Observable<EstablecimientoResponse[]> {
    return this.http.get<EstablecimientoResponse[]>(this.apiURL);
  }

  obtener(id: number): Observable<EstablecimientoResponse> {
    return this.http.get<EstablecimientoResponse>(`${this.apiURL}/${id}`);
  }

  guardar(establecimiento: EstablecimientoResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, establecimiento);
  }

  actualizar(id: number, establecimiento: EstablecimientoResponse): Observable<any> {
    return this.http.put(`${this.apiURL}/actualizar/${id}`, establecimiento);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }
}