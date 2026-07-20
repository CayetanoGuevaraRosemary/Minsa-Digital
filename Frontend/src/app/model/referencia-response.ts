export interface ReferenciaResponse {
  id_referencia: number;
  id_paciente: number;
  id_establecimiento_origen: number;
  id_establecimiento_destino: number;
  id_especialidad: number;
  estado_referencia: string;
  especialidad?: string;
  establecimiento_destino?: string;
}