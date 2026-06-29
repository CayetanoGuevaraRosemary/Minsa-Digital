import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacienteResponse } from '../../../../model/paciente-response';
import { Paciente } from '../../../../services/paciente';

@Component({
  selector: 'app-lista-pacientes',
  imports: [CommonModule],
  templateUrl: './lista-pacientes.html',
  styleUrl: './lista-pacientes.css',
})
export class ListaPacientes implements OnInit{
  listaPacientes = signal<PacienteResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Paciente,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaPacientes.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de pacientes';
        console.error(err);
      }
    });
  }

  nuevoPaciente() {
    this.router.navigate(['/admin/pacientes/nuevo']);
  }

  editarPaciente(id: number) {
    this.router.navigate(['/admin/pacientes/editar', id]);
  }

  eliminarPaciente(id: number) {
    if(!confirm('Seguro que deseas eliminar este paciente?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarPacientes(),
      error: (err) => {
        this.error = 'Error al eliminar el paciente';
        console.error(err);
      }
    });
  }
}
