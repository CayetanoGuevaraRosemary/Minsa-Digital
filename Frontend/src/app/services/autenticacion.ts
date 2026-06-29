import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginAdminResponse, LoginPacienteResponse } from '../model/login-response';

@Injectable({
  providedIn: 'root',
})
export class Autenticacion {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  loginPaciente(numero_documento: string, password_hash: string): Observable<LoginPacienteResponse | string> {
    return this.http.post<LoginPacienteResponse | string>(`${this.apiURL}/login/paciente`, {
      numero_documento,
      password_hash
    });
  }

  loginAdmin(email: string, password_hash: string): Observable<LoginAdminResponse | string> {
    return this.http.post<LoginAdminResponse | string>(`${this.apiURL}/login/admin`, {
      email,
      password_hash
    });
  }
}