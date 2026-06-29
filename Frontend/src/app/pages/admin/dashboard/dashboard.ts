import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../services/sesion';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  nombreAdmin = 'Administrador';

  constructor(
    private sesion: Sesion,
    private router: Router
  ) {
    if (this.sesion.usuario) {
      this.nombreAdmin = this.sesion.usuario.nombre;
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
