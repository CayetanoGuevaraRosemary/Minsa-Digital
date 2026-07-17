import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReferenciaResponse } from '../../../../model/referencia-response';
import { Referencia } from '../../../../services/referencia';

@Component({
  selector: 'app-lista-referencias',
  imports: [CommonModule],
  templateUrl: './lista-referencias.html',
  styleUrl: './lista-referencias.css',
})
export class ListaReferencias implements OnInit {
  listaReferencias = signal<ReferenciaResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Referencia,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReferencias();
  }

  cargarReferencias() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaReferencias.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de referencias';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  nuevaReferencia() {
    this.router.navigate(['/admin/referencias/nuevo']);
  }

  cambiarEstado(id: number, estado: string) {
    this.service.actualizarEstado(id, estado).subscribe({
      next: () => this.cargarReferencias(),
      error: (err) => {
        this.error = 'Error al actualizar el estado';
        console.error(err);
      }
    });
  }

  eliminarReferencia(id: number) {
    if (!confirm('¿Seguro que deseas eliminar esta referencia?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarReferencias(),
      error: (err) => {
        this.error = 'Error al eliminar la referencia';
        console.error(err);
      }
    });
  }
}