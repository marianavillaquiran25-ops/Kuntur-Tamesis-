export interface Ruta {

  id?: number;

  nombre: string;

  destino: string;

  descripcion: string;

  imagen?: string;

  precio: number;

  cuposDisponibles: number;

  duracion: string;

  activa?: boolean;

}