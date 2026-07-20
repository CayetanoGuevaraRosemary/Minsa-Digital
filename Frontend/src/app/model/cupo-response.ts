export interface CupoResponse {
  id_cupo: number;
  id_medico: number;
  id_establecimiento: number;
  fecha: string;
  hora: string;
  slots_totales: number;
  slots_disponibles: number;
  tipo_cita: string;
  medico?: string;
  especialidad?: string;
  establecimiento?: string;
}