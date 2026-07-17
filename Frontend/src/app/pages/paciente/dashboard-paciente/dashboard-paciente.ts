import { Component } from '@angular/core';
import { Sesion } from '../../../services/sesion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-paciente',
  imports: [],
  templateUrl: './dashboard-paciente.html',
  styleUrl: './dashboard-paciente.css',
})
export class DashboardPaciente {
  nombrePaciente = 'Paciente';

  constructor(
    private sesion: Sesion,
    private router: Router
  ) {
    if (this.sesion.usuario) {
      this.nombrePaciente = this.sesion.usuario.nombres;
    }
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    this.sesion.cerrar();
    this.router.navigate(['/login']);
  }
}
