import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecetaResponse, RecetaDetalleResponse } from '../../../model/receta-response';
import { Receta } from '../../../services/receta';
import { Sesion } from '../../../services/sesion';

@Component({
  selector: 'app-mis-recetas',
  imports: [CommonModule],
  templateUrl: './mis-recetas.html',
  styleUrl: './mis-recetas.css',
})
export class MisRecetas implements OnInit {
  misRecetas = signal<RecetaResponse[]>([]);
  error: string | null = null;
  recetaAbierta: number | null = null;
  detalles: { [id_receta: number]: RecetaDetalleResponse[] } = {};

  constructor(
    private service: Receta,
    private sesion: Sesion,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sesion.usuario) {
      this.service.listarPorPaciente(this.sesion.usuario.id_paciente).subscribe({
        next: (data) => {
          this.misRecetas.set(data);
        },
        error: (err) => {
          this.error = 'Error al cargar tus recetas';
          console.error(err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/paciente/dashboard']);
  }

  verDetalle(item: RecetaResponse) {
    if (this.recetaAbierta === item.id_receta) {
      this.recetaAbierta = null;
      return;
    }
    this.recetaAbierta = item.id_receta;
    if (!this.detalles[item.id_receta]) {
      this.service.obtenerDetalle(item.id_receta).subscribe({
        next: (data) => this.detalles[item.id_receta] = data,
        error: (err) => console.error(err)
      });
    }
  }
}
