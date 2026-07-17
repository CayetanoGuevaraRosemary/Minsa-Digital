import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EstablecimientoResponse } from '../../../../model/establecimiento-response';
import { Establecimiento } from '../../../../services/establecimiento';

@Component({
  selector: 'app-lista-establecimientos',
  imports: [CommonModule],
  templateUrl: './lista-establecimientos.html',
  styleUrl: './lista-establecimientos.css',
})
export class ListaEstablecimientos implements OnInit {
  listaEstablecimientos = signal<EstablecimientoResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Establecimiento,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEstablecimientos();
  }

  cargarEstablecimientos() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaEstablecimientos.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de establecimientos';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  nuevoEstablecimiento() {
    this.router.navigate(['/admin/establecimientos/nuevo']);
  }

  editarEstablecimiento(id: number) {
    this.router.navigate(['/admin/establecimientos/editar', id]);
  }

  eliminarEstablecimiento(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este establecimiento?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarEstablecimientos(),
      error: (err) => {
        this.error = 'Error al eliminar el establecimiento';
        console.error(err);
      }
    });
  }
}