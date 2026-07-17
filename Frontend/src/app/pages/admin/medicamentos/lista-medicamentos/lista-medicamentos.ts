import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MedicamentoResponse } from '../../../../model/medicamento-response';
import { Medicamento } from '../../../../services/medicamento';

@Component({
  selector: 'app-lista-medicamentos',
  imports: [CommonModule],
  templateUrl: './lista-medicamentos.html',
  styleUrl: './lista-medicamentos.css',
})
export class ListaMedicamentos implements OnInit{
  listaMedicamentos = signal<MedicamentoResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Medicamento,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaMedicamentos.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de medicamentos';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  nuevoMedicamento() {
    this.router.navigate(['/admin/medicamentos/nuevo']);
  }

  editarMedicamento(id: number) {
    this.router.navigate(['/admin/medicamentos/editar', id]);
  }

  eliminarMedicamento(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este medicamento?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarMedicamentos(),
      error: (err) => {
        this.error = 'Error al eliminar el medicamento';
        console.error(err);
      }
    });
  }
}