import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteResponse } from '../../../../model/paciente-response';
import { Paciente } from '../../../../services/paciente';

@Component({
  selector: 'app-formulario-paciente',
  imports: [FormsModule],
  templateUrl: './formulario-paciente.html',
  styleUrl: './formulario-paciente.css',
})
export class FormularioPaciente implements OnInit{
  paciente = signal<PacienteResponse>({
    id_paciente: 0,
    tipo_documento: '',
    numero_documento: '',
    password_hash: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    codigo_verificacion: '',
    rol: 'paciente',
    id_titular: null
  });

  error: string | null = null;
  esEdicion = false;
  private idEditar: number | null = null;

  constructor(
    private service: Paciente,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
      this.service.obtener(this.idEditar).subscribe({
        next: (data) => this.paciente.set(data),
        error: (err) => {
          this.error = 'No se pudo cargar el paciente';
          console.error(err);
        }
      });
    }
  }

  guardar() {
    const operacion = this.esEdicion
      ? this.service.actualizar(this.idEditar!, this.paciente())
      : this.service.guardar(this.paciente());

    operacion.subscribe({
      next: () => {
        this.router.navigate(['/admin/pacientes']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar al paciente';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/pacientes']);
  }
}
