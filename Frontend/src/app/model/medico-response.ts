export interface MedicoResponse {
  id_medico: number;
  nombres: string;
  apellidos: string;
  cmp: string;
  id_especialidad: number;
  especialidad?: string;
}