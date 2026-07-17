import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VacunaResponse } from '../../../../model/vacuna-response';
import { Vacuna } from '../../../../services/vacuna';

@Component({
  selector: 'app-lista-vacunas',
  imports: [CommonModule],
  templateUrl: './lista-vacunas.html',
  styleUrl: './lista-vacunas.css',
})
export class ListaVacunas implements OnInit {
  listaVacunas = signal<VacunaResponse[]>([]);
  error: string | null = null;

  constructor(
    private service: Vacuna,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVacunas();
  }

  cargarVacunas() {
    this.service.listar().subscribe({
      next: (data) => {
        this.listaVacunas.set(data);
      },
      error: (err) => {
        this.error = 'Error al cargar el registro de vacunas';
        console.error(err);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/dashboard']);
  }

  nuevaVacuna() {
    this.router.navigate(['/admin/vacunas/nuevo']);
  }
}