import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sesion {
  usuario: any = null;
  tipoUsuario: 'paciente' | 'admin' | null = null;

  iniciar(usuario: any, tipoUsuario: 'paciente' | 'admin') {
    this.usuario = usuario;
    this.tipoUsuario = tipoUsuario;
  }

  cerrar() {
    this.usuario = null;
    this.tipoUsuario = null;
  }
}
