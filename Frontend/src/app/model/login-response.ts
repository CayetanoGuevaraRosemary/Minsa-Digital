export interface LoginPacienteResponse {
  id_paciente: number;
  tipo_documento: string;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  rol: string;
}

export interface LoginAdminResponse {
  id_admin: number;
  nombre: string;
  email: string;
  rol: string;
}