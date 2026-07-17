import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoResponse } from '../../../../model/medicamento-response';
import { Medicamento } from '../../../../services/medicamento';

@Component({
  selector: 'app-formulario-medicamento',
  imports: [FormsModule],
  templateUrl: './formulario-medicamento.html',
  styleUrl: './formulario-medicamento.css',
})
export class FormularioMedicamento implements OnInit {
  medicamento = signal<MedicamentoResponse>({
    id_medicamento: 0,
    nombre: '',
    presentacion: '',
    concentracion: ''
  });

  error: string | null = null;
  esEdicion = false;
  private idEditar: number | null = null;

  constructor(
    private service: Medicamento,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
      this.service.obtener(this.idEditar).subscribe({
        next: (data) => this.medicamento.set(data),
        error: (err) => {
          this.error = 'No se pudo cargar el medicamento';
          console.error(err);
        }
      });
    }
  }

  guardar() {
    const operacion = this.esEdicion
      ? this.service.actualizar(this.idEditar!, this.medicamento())
      : this.service.guardar(this.medicamento());

    operacion.subscribe({
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