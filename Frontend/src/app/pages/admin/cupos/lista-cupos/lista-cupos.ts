import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CupoResponse } from '../../../../model/cupo-response';
import { Cupo } from '../../../../services/cupo';

@Component({
  selector: 'app-lista-cupos',
  imports: [CommonModule],
  templateUrl: './lista-cupos.html',
  styleUrl: './lista-cupos.css',
})
export class ListaCupos implements OnInit {
  listaCupos = signal<CupoResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Cupo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCupos();
  }

  cargarCupos() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaCupos.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de cupos';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  nuevoCupo() {
    this.router.navigate(['/admin/cupos/nuevo']);
  }

  editarCupo(id: number) {
    this.router.navigate(['/admin/cupos/editar', id]);
  }

  eliminarCupo(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este cupo?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarCupos(),
      error: (err) => {
        this.error = 'Error al eliminar el cupo';
        console.error(err);
      }
    });
  }
}