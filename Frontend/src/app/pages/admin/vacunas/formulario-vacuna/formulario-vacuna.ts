import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VacunaResponse } from '../../../../model/vacuna-response';
import { Vacuna } from '../../../../services/vacuna';
import { EstablecimientoResponse } from '../../../../model/establecimiento-response';
import { Establecimiento } from '../../../../services/establecimiento';

@Component({
  selector: 'app-formulario-vacuna',
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-vacuna.html',
  styleUrl: './formulario-vacuna.css',
})
export class FormularioVacuna implements OnInit {
  vacuna = signal<VacunaResponse>({
    id_vacuna: 0,
    id_paciente: 0,
    nombre_vacuna: '',
    tipo_carne: '',
    dosis: '',
    fecha_aplicacion: '',
    id_establecimiento: 0
  });

  establecimientos: EstablecimientoResponse[] = [];
  error: string | null = null;

  constructor(
    private service: Vacuna,
    private establecimientoService: Establecimiento,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.establecimientoService.listar().subscribe({
      next: (data) => this.establecimientos = data,
      error: (err) => console.error(err)
    });
  }

  guardar() {
    this.service.guardar(this.vacuna()).subscribe({
      next: () => {
        this.router.navigate(['/admin/vacunas']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar la vacuna';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/vacunas']);
  }
}