export interface CitaResponse {
  id_cita: number;
  id_paciente: number;
  id_cupo: number;
  tipo_cita: string;
  estado_cita: string;
  tipo_usuario: string;
  paciente?: string;
  medico?: string;
  fecha?: string;
  hora?: string;
}