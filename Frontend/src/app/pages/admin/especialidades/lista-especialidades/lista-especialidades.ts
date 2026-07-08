import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EspecialidadResponse } from '../../../../model/especialidad-response';
import { Especialidad } from '../../../../services/especialidad';

@Component({
  selector: 'app-lista-especialidades',
  imports: [CommonModule],
  templateUrl: './lista-especialidades.html',
  styleUrl: './lista-especialidades.css',
})
export class ListaEspecialidades implements OnInit{
  listaEspecialidades = signal<EspecialidadResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Especialidad,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaEspecialidades.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de especialidades';
        console.error(err);
      }
    });
  }

  nuevaEspecialidad() {
    this.router.navigate(['/admin/especialidades/nuevo']);
  }
}