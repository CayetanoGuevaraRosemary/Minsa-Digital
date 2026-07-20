import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitaResponse } from '../../../../model/cita-response';
import { Cita } from '../../../../services/cita';

@Component({
  selector: 'app-lista-citas',
  imports: [CommonModule],
  templateUrl: './lista-citas.html',
  styleUrl: './lista-citas.css',
})
export class ListaCitas implements OnInit {
  listaCitas = signal<CitaResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Cita,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaCitas.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de citas';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  cambiarEstado(id: number, estado: string) {
    this.service.actualizarEstado(id, estado).subscribe({
      next: () => this.cargarCitas(),
      error: (err) => {
        this.error = 'Error al actualizar el estado';
        console.error(err);
      }
    });
  }

  eliminarCita(id: number) {
    if (!confirm('¿Seguro que deseas eliminar esta cita?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarCitas(),
      error: (err) => {
        this.error = 'Error al eliminar la cita';
        console.error(err);
      }
    });
  }

  agregarReceta(item: CitaResponse) {
    this.router.navigate(['/admin/recetas/nuevo'], {
      queryParams: { id_cita: item.id_cita, id_paciente: item.id_paciente }
    });
  }
}