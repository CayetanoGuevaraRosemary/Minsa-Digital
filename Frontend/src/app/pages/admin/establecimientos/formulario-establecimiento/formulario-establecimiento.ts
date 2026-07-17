import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablecimientoResponse } from '../../../../model/establecimiento-response';
import { Establecimiento } from '../../../../services/establecimiento';

@Component({
  selector: 'app-formulario-establecimiento',
  imports: [FormsModule],
  templateUrl: './formulario-establecimiento.html',
  styleUrl: './formulario-establecimiento.css',
})
export class FormularioEstablecimiento implements OnInit {
  establecimiento = signal<EstablecimientoResponse>({
    id_establecimiento: 0,
    nombre: '',
    direccion: '',
    id_ubicacion: 0,
    tipo: ''
  });

  error: string | null = null;
  esEdicion = false;
  private idEditar: number | null = null;

  constructor(
    private service: Establecimiento,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
      this.service.obtener(this.idEditar).subscribe({
        next: (data) => this.establecimiento.set(data),
        error: (err) => {
          this.error = 'No se pudo cargar el establecimiento';
          console.error(err);
        }
      });
    }
  }

  guardar() {
    const operacion = this.esEdicion
      ? this.service.actualizar(this.idEditar!, this.establecimiento())
      : this.service.guardar(this.establecimiento());

    operacion.subscribe({
      next: () => {
        this.router.navigate(['/admin/establecimientos']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar el establecimiento';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/establecimientos']);
  }
}