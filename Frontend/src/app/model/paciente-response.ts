export interface PacienteResponse {
    id_paciente: number;
    tipo_documento: string;
    numero_documento: string;
    password_hash: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: string;
    codigo_verificacion: string;
    rol: string;
    id_titular: number | null;
}
