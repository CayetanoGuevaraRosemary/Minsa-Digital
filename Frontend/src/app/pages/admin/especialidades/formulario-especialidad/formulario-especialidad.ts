import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadResponse } from '../../../../model/especialidad-response';
import { Especialidad } from '../../../../services/especialidad';

@Component({
  selector: 'app-formulario-especialidad',
  imports: [FormsModule],
  templateUrl: './formulario-especialidad.html',
  styleUrl: './formulario-especialidad.css',
})
export class FormularioEspecialidad implements OnInit {
  especialidad = signal<EspecialidadResponse>({
    id_especialidad: 0,
    nombre: '',
    descripcion: ''
  });

  error: string | null = null;
  esEdicion = false;
  private idEditar: number | null = null;

  constructor(
    private service: Especialidad,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
      this.service.obtener(this.idEditar).subscribe({
        next: (data) => this.especialidad.set(data),
        error: (err) => {
          this.error = 'No se pudo cargar la especialidad';
          console.error(err);
        }
      });
    }
  }

  guardar() {
    const operacion = this.esEdicion
      ? this.service.actualizar(this.idEditar!, this.especialidad())
      : this.service.guardar(this.especialidad());

    operacion.subscribe({
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