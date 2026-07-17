import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitaResponse } from '../../../model/cita-response';
import { Cita } from '../../../services/cita';
import { Sesion } from '../../../services/sesion';

@Component({
  selector: 'app-mis-citas',
  imports: [CommonModule],
  templateUrl: './mis-citas.html',
  styleUrl: './mis-citas.css',
})
export class MisCitas implements OnInit {
  misCitas = signal<CitaResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Cita,
    private sesion: Sesion,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sesion.usuario) {
      this.service.listarPorPaciente(this.sesion.usuario.id_paciente).subscribe({
        next: (data) => {
          this.misCitas.set(data);
        },
        error: (err) => {
          this.error = 'Error al cargar tus citas';
          console.error(err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/paciente/dashboard']);
  }

  reservar() {
    this.router.navigate(['/paciente/reservar']);
  }
}