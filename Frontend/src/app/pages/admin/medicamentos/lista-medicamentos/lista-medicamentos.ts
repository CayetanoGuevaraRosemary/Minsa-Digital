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

  nuevoMedicamento() {
    this.router.navigate(['/admin/medicamentos/nuevo']);
  }
}