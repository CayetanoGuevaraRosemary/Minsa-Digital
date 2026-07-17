import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecetaResponse } from '../../../../model/receta-response';
import { Receta } from '../../../../services/receta';

@Component({
  selector: 'app-lista-recetas',
  imports: [CommonModule],
  templateUrl: './lista-recetas.html',
  styleUrl: './lista-recetas.css',
})
export class ListaRecetas implements OnInit {
  listaRecetas = signal<RecetaResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Receta,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRecetas();
  }

  cargarRecetas() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaRecetas.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de recetas';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  nuevaReceta() {
    this.router.navigate(['/admin/recetas/nuevo']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/admin/recetas/detalle', id]);
  }
}