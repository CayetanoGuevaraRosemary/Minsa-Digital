import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoResponse } from '../../../../model/medico-response';
import { Medico } from '../../../../services/medico';
import { EspecialidadResponse } from '../../../../model/especialidad-response';
import { Especialidad } from '../../../../services/especialidad';

@Component({
  selector: 'app-formulario-medico',
  imports: [FormsModule],
  templateUrl: './formulario-medico.html',
  styleUrl: './formulario-medico.css',
})
export class FormularioMedico implements OnInit {
  medico = signal<MedicoResponse>({
    id_medico: 0,
    nombres: '',
    apellidos: '',
    cmp: '',
    id_especialidad: 0
  });

  especialidades: EspecialidadResponse[] = [];
  error: string | null = null;
  esEdicion = false;
  private idEditar: number | null = null;

  constructor(
    private service: Medico,
    private especialidadService: Especialidad,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.especialidadService.listar().subscribe({
      next: (data) => this.especialidades = data,
      error: (err) => console.error(err)
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
      this.service.obtener(this.idEditar).subscribe({
        next: (data) => this.medico.set(data),
        error: (err) => {
          this.error = 'No se pudo cargar el médico';
          console.error(err);
        }
      });
    }
  }

  guardar() {
    const operacion = this.esEdicion
      ? this.service.actualizar(this.idEditar!, this.medico())
      : this.service.guardar(this.medico());

    operacion.subscribe({
      next: () => {
        this.router.navigate(['/admin/medicos']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar el médico';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/medicos']);
  }
}