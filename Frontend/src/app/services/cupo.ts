import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CupoResponse } from '../model/cupo-response';

@Injectable({
  providedIn: 'root',
})
export class Cupo {
  private apiURL = 'http://localhost:3000/cupos';

  constructor(private http: HttpClient) {}

  listar(): Observable<CupoResponse[]> {
    return this.http.get<CupoResponse[]>(this.apiURL);
  }

  obtener(id: number): Observable<CupoResponse> {
    return this.http.get<CupoResponse>(`${this.apiURL}/${id}`);
  }

  guardar(cupo: CupoResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, cupo);
  }

  actualizar(id: number, cupo: CupoResponse): Observable<any> {
    return this.http.put(`${this.apiURL}/actualizar/${id}`, cupo);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }
}