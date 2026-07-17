import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VacunaResponse } from '../../../model/vacuna-response';
import { Vacuna } from '../../../services/vacuna';
import { Sesion } from '../../../services/sesion';

@Component({
  selector: 'app-mis-vacunas',
  imports: [CommonModule],
  templateUrl: './mis-vacunas.html',
  styleUrl: './mis-vacunas.css',
})
export class MisVacunas implements OnInit {
  misVacunas = signal<VacunaResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Vacuna,
    private sesion: Sesion,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sesion.usuario) {
      this.service.listarPorPaciente(this.sesion.usuario.id_paciente).subscribe({
        next: (data) => {
          this.misVacunas.set(data);
        },
        error: (err) => {
          this.error = 'Error al cargar tus vacunas';
          console.error(err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/paciente/dashboard']);
  }
}