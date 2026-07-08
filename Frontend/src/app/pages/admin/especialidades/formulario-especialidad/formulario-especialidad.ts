import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EspecialidadResponse } from '../../../../model/especialidad-response';
import { Especialidad } from '../../../../services/especialidad';

@Component({
  selector: 'app-formulario-especialidad',
  imports: [FormsModule],
  templateUrl: './formulario-especialidad.html',
  styleUrl: './formulario-especialidad.css',
})
export class FormularioEspecialidad {
  especialidad = signal<EspecialidadResponse>({
    id_especialidad: 0,
    nombre: '',
    descripcion: ''
  });

  error: string | null = null;

  constructor(
    private service: Especialidad,
    private router: Router
  ) {}

  guardar() {
    this.service.guardar(this.especialidad()).subscribe({
      next: () => {
        this.router.navigate(['/admin/especialidades']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar la especialidad';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/especialidades']);
  }
}