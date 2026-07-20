import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sesion } from '../../../services/sesion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  nombreAdmin = 'Administrador';
  modulos = [
    { nombre: 'Pacientes', descripcion: 'Registro y listado de pacientes', icono: 'bi-person-heart', ruta: '/admin/pacientes' },
    { nombre: 'Médicos', descripcion: 'Registro y listado de médicos', icono: 'bi-person-badge', ruta: '/admin/medicos' },
    { nombre: 'Especialidades', descripcion: 'Registro de especialidades', icono: 'bi-journal-medical', ruta: '/admin/especialidades' },
    { nombre: 'Establecimientos', descripcion: 'Gestión de establecimientos', icono: 'bi-hospital', ruta: '/admin/establecimientos' },
    { nombre: 'Cupos', descripcion: 'Gestión de cupos disponibles', icono: 'bi-calendar-check', ruta: '/admin/cupos' },
    { nombre: 'Citas', descripcion: 'Gestión de citas médicas', icono: 'bi-clipboard2-check', ruta: '/admin/citas' },
    { nombre: 'Recetas', descripcion: 'Gestión de recetas médicas', icono: 'bi-clipboard2-pulse', ruta: '/admin/recetas' },
    { nombre: 'Medicamentos', descripcion: 'Registro de medicamentos', icono: 'bi-capsule', ruta: '/admin/medicamentos' },
    { nombre: 'Referencias', descripcion: 'Gestión de referencias médicas', icono: 'bi-arrow-left-right', ruta: '/admin/referencias' },
    { nombre: 'Vacunas', descripcion: 'Registro de vacunas aplicadas', icono: 'bi-shield-plus', ruta: '/admin/vacunas' },
  ];

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
