import { Ruta } from './ruta.model';

export interface Reserva {

  id?: number;

  fechaReserva: string;

  estado: string;

  turista?: any;

  ruta?: Ruta;

}