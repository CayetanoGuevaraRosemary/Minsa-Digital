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

  guardar(medicamento: MedicamentoResponse): Observable<any> {
    return this.http.post(`${this.apiURL}/guardar`, medicamento);
  }
}