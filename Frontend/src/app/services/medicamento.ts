import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicamentoResponse } from '../model/medicamento-response';

@Injectable({
  providedIn: 'root',
})
export class Medicamento {
  private apiURL = 'http://localhost:3000/medicamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<MedicamentoResponse[]> {
    return this.http.get<MedicamentoResponse[]>(this.apiURL);
  }

  obtener(id: number): Observable<MedicamentoResponse> {
    return this.http.get<MedicamentoResponse>(`${this.apiURL}/${id}`);
  }

  guardar(medicamento: MedicamentoResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, medicamento);
  }

  actualizar(id: number, medicamento: MedicamentoResponse): Observable<any> {
    return this.http.put(`${this.apiURL}/actualizar/${id}`, medicamento);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }
}