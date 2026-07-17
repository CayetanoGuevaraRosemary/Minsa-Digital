export interface RecetaResponse {
  id_receta: number;
  id_cita: number;
  id_paciente: number;
  estado_dispensacion: string;
  observaciones: string;
}

export interface RecetaDetalleResponse {
  id_detalle: number;
  id_receta: number;
  id_medicamento: number;
  dosis: string;
  frecuencia: string;
  duracion_dias: number;
  cantidad: number;
  nombre?: string;
  presentacion?: string;
  concentracion?: string;
}