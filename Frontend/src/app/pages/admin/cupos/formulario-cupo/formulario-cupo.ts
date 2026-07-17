import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CupoResponse } from '../../../../model/cupo-response';
import { Cupo } from '../../../../services/cupo';
import { MedicoResponse } from '../../../../model/medico-response';
import { Medico } from '../../../../services/medico';
import { EstablecimientoResponse } from '../../../../model/establecimiento-response';
import { Establecimiento } from '../../../../services/establecimiento';

@Component({
  selector: 'app-formulario-cupo',
  imports: [FormsModule],
  templateUrl: './formulario-cupo.html',
  styleUrl: './formulario-cupo.css',
})
export class FormularioCupo implements OnInit {
  cupo = signal<CupoResponse>({
    id_cupo: 0,
    id_medico: 0,
    id_establecimiento: 0,
    fecha: '',
    hora: '',
    slots_totales: 1,
    slots_disponibles: 1,
    tipo_cita: ''
  });

  medicos: MedicoResponse[] = [];
  establecimientos: EstablecimientoResponse[] = [];
  error: string | null = null;
  esEdicion = false;
  private idEditar: number | null = null;

  constructor(
    private service: Cupo,
    private medicoService: Medico,
    private establecimientoService: Establecimiento,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicoService.listar().subscribe({
      next: (data) => this.medicos = data,
      error: (err) => console.error(err)
    });

    this.establecimientoService.listar().subscribe({
      next: (data) => this.establecimientos = data,
      error: (err) => console.error(err)
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
      this.service.obtener(this.idEditar).subscribe({
        next: (data) => this.cupo.set(data),
        error: (err) => {
          this.error = 'No se pudo cargar el cupo';
          console.error(err);
        }
      });
    }
  }

  guardar() {
    const operacion = this.esEdicion
      ? this.service.actualizar(this.idEditar!, this.cupo())
      : this.service.guardar(this.cupo());

    operacion.subscribe({
      next: () => {
        this.router.navigate(['/admin/cupos']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar el cupo';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/cupos']);
  }
}