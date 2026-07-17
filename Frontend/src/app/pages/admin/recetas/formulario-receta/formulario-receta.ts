import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaDetalleResponse, RecetaResponse } from '../../../../model/receta-response';
import { Receta } from '../../../../services/receta';
import { MedicamentoResponse } from '../../../../model/medicamento-response';
import { Medicamento } from '../../../../services/medicamento';

@Component({
  selector: 'app-formulario-receta',
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-receta.html',
  styleUrl: './formulario-receta.css',
})
export class FormularioReceta implements OnInit {
  receta = signal<RecetaResponse>({
    id_receta: 0,
    id_cita: 0,
    id_paciente: 0,
    estado_dispensacion: 'pendiente',
    observaciones: ''
  });

  detalle = signal<RecetaDetalleResponse>({
    id_detalle: 0,
    id_receta: 0,
    id_medicamento: 0,
    dosis: '',
    frecuencia: '',
    duracion_dias: 1,
    cantidad: 1
  });

  detalles: RecetaDetalleResponse[] = [];
  medicamentos: MedicamentoResponse[] = [];
  idRecetaCreada: number | null = null;
  error: string | null = null;
  modoDetalle = false;

  constructor(
    private service: Receta,
    private medicamentoService: Medicamento,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicamentoService.listar().subscribe({
      next: (data) => this.medicamentos = data,
      error: (err) => console.error(err)
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idRecetaCreada = Number(idParam);
      this.modoDetalle = true;
      this.detalle.set({ ...this.detalle(), id_receta: this.idRecetaCreada });
      this.service.obtenerDetalle(this.idRecetaCreada).subscribe({
        next: (data) => this.detalles = data,
        error: (err) => console.error(err)
      });
    }
  }

  guardarReceta() {
    this.service.guardar(this.receta()).subscribe({
      next: (resp) => {
        this.router.navigate(['/admin/recetas']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar la receta';
        console.error(err);
      }
    });
  }

  agregarDetalle() {
    this.service.guardarDetalle(this.detalle()).subscribe({
      next: () => {
        this.service.obtenerDetalle(this.idRecetaCreada!).subscribe({
          next: (data) => this.detalles = data,
          error: (err) => console.error(err)
        });
        this.detalle.set({
          id_detalle: 0,
          id_receta: this.idRecetaCreada!,
          id_medicamento: 0,
          dosis: '',
          frecuencia: '',
          duracion_dias: 1,
          cantidad: 1
        });
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al agregar medicamento';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/recetas']);
  }
}