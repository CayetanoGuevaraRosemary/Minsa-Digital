import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CitaResponse } from '../../../model/cita-response';
import { Cita } from '../../../services/cita';
import { CupoResponse } from '../../../model/cupo-response';
import { Cupo } from '../../../services/cupo';
import { Sesion } from '../../../services/sesion';

@Component({
  selector: 'app-reservar-cita',
  imports: [FormsModule, DatePipe],
  templateUrl: './reservar-cita.html',
  styleUrl: './reservar-cita.css',
})
export class ReservarCita implements OnInit {
  cita = signal<CitaResponse>({
    id_cita: 0,
    id_paciente: 0,
    id_cupo: 0,
    tipo_cita: '',
    estado_cita: 'pendiente',
    tipo_usuario: 'paciente'
  });

  cupos: CupoResponse[] = [];
  error: string | null = null;

  constructor(
    private citaService: Cita,
    private cupoService: Cupo,
    private sesion: Sesion,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sesion.usuario) {
      this.cita.set({ ...this.cita(), id_paciente: this.sesion.usuario.id_paciente });
    }

    this.cupoService.listar().subscribe({
      next: (data) => this.cupos = data,
      error: (err) => console.error(err)
    });
  }

  guardar() {
    this.citaService.guardar(this.cita()).subscribe({
      next: () => {
        this.router.navigate(['/paciente/mis-citas']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al reservar la cita';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/paciente/mis-citas']);
  }
}