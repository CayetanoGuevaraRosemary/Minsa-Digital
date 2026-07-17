import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReferenciaResponse } from '../../../../model/referencia-response';
import { Referencia } from '../../../../services/referencia';
import { EstablecimientoResponse } from '../../../../model/establecimiento-response';
import { Establecimiento } from '../../../../services/establecimiento';
import { EspecialidadResponse } from '../../../../model/especialidad-response';
import { Especialidad } from '../../../../services/especialidad';

@Component({
  selector: 'app-formulario-referencia',
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-referencia.html',
  styleUrl: './formulario-referencia.css',
})
export class FormularioReferencia implements OnInit {
  referencia = signal<ReferenciaResponse>({
    id_referencia: 0,
    id_paciente: 0,
    id_establecimiento_origen: 0,
    id_establecimiento_destino: 0,
    id_especialidad: 0,
    estado_referencia: 'pendiente'
  });

  establecimientos: EstablecimientoResponse[] = [];
  especialidades: EspecialidadResponse[] = [];
  error: string | null = null;

  constructor(
    private service: Referencia,
    private establecimientoService: Establecimiento,
    private especialidadService: Especialidad,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.establecimientoService.listar().subscribe({
      next: (data) => this.establecimientos = data,
      error: (err) => console.error(err)
    });

    this.especialidadService.listar().subscribe({
      next: (data) => this.especialidades = data,
      error: (err) => console.error(err)
    });
  }

  guardar() {
    this.service.guardar(this.referencia()).subscribe({
      next: () => {
        this.router.navigate(['/admin/referencias']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar la referencia';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/referencias']);
  }
}