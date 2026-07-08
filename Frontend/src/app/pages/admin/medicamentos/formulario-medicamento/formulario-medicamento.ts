import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicamentoResponse } from '../../../../model/medicamento-response';
import { Medicamento } from '../../../../services/medicamento';

@Component({
  selector: 'app-formulario-medicamento',
  imports: [FormsModule],
  templateUrl: './formulario-medicamento.html',
  styleUrl: './formulario-medicamento.css',
})
export class FormularioMedicamento {
  medicamento = signal<MedicamentoResponse>({
    id_medicamento: 0,
    nombre: '',
    presentacion: '',
    concentracion: ''
  });

  error: string | null = null;

  constructor(
    private service: Medicamento,
    private router: Router
  ) {}

  guardar() {
    this.service.guardar(this.medicamento()).subscribe({
      next: () => {
        this.router.navigate(['/admin/medicamentos']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar el medicamento';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/medicamentos']);
  }
}