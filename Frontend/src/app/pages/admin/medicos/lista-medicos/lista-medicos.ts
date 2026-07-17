import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MedicoResponse } from '../../../../model/medico-response';
import { Medico } from '../../../../services/medico';

@Component({
  selector: 'app-lista-medicos',
  imports: [CommonModule],
  templateUrl: './lista-medicos.html',
  styleUrl: './lista-medicos.css',
})
export class ListaMedicos implements OnInit {
  listaMedicos = signal<MedicoResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Medico,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaMedicos.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de médicos';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  nuevoMedico() {
    this.router.navigate(['/admin/medicos/nuevo']);
  }

  editarMedico(id: number) {
    this.router.navigate(['/admin/medicos/editar', id]);
  }

  eliminarMedico(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este médico?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarMedicos(),
      error: (err) => {
        this.error = 'Error al eliminar el médico';
        console.error(err);
      }
    });
  }
}