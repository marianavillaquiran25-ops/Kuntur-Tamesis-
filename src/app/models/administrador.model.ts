export interface Administrador {
  id_Administrador?: number; 
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  password?: string;
  cargo: string;
}

// Interfaces adicionales para las gestiones que realiza el admin
export interface Ruta {
  id_Ruta?: number;
  nombre: string;
  destino: string;
  precio: number;
}

export interface Pago {
  id_Pago?: number;
  monto: number;
  fecha: string;
  estado: string;
}