import { Ruta } from './ruta.model';

export interface Pago {

  id?: number;

  monto: number;

  fecha: string;

  metodoPago: string;

  estado: string;

  turista?: any;

  ruta?: Ruta;

}