export interface EstablecimientoResponse {
  id_establecimiento: number;
  nombre: string;
  direccion: string;
  id_ubicacion: number;
  tipo: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
}