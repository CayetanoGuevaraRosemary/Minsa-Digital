import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReferenciaResponse } from '../../../model/referencia-response';
import { Referencia } from '../../../services/referencia';
import { Sesion } from '../../../services/sesion';

@Component({
  selector: 'app-mis-referencias',
  imports: [CommonModule],
  templateUrl: './mis-referencias.html',
  styleUrl: './mis-referencias.css',
})
export class MisReferencias implements OnInit {
  misReferencias = signal<ReferenciaResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Referencia,
    private sesion: Sesion,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sesion.usuario) {
      this.service.listarPorPaciente(this.sesion.usuario.id_paciente).subscribe({
        next: (data) => {
          this.misReferencias.set(data);
        },
        error: (err) => {
          this.error = 'Error al cargar tus referencias';
          console.error(err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/paciente/dashboard']);
  }
}