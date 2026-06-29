import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Autenticacion } from '../../services/autenticacion';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  modo: 'paciente' | 'admin' = 'paciente';

  tipoDocumento = 'DNI';
  documento = '';
  email = '';
  password = '';
  verPassword = false;

  error: string | null = null;

  constructor(
    private autenticacion: Autenticacion,
    private router: Router
  ) {}

  ingresarPaciente() {
    this.error = null;
    this.autenticacion.loginPaciente(this.documento, this.password).subscribe({
      next: (data) => {
        if (typeof data === 'string') {
          this.error = data;
        } else {
          this.router.navigate(['/paciente/dashboard']);
        }
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor';
      }
    });
  }

  ingresarAdmin() {
    this.error = null;
    this.autenticacion.loginAdmin(this.email, this.password).subscribe({
      next: (data) => {
        if (typeof data === 'string') {
          this.error = data;
        } else {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor';
      }
    });
  }
}

