import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservaService } from '../../services/reserva.service';
import { TuristaService } from '../../services/turista.service';
import { GuiaService } from '../../services/guia.service';
import { RutaService } from '../../services/ruta.service';

@Component({
selector: 'app-auxiliar',
standalone: true,
imports: [
  CommonModule,
  FormsModule
],
templateUrl: './auxiliar.component.html',
styleUrls: ['./auxiliar.component.scss']
})
export class AuxiliarComponent implements OnInit {

constructor(
private reservaService: ReservaService,
private turistaService: TuristaService,
private guiaService: GuiaService,
private rutaService: RutaService
) {}

auxiliar: any = {
nombre: '',
correo: '',
telefono: ''
};

vistaActual = 'dashboard';

reservas: any[] = [];
turistas: any[] = [];
guias: any[] = [];
rutas: any[] = [];

mensaje = '';
mostrarMensaje = false;
tipoMensaje = '';
mostrarModalReporte = false;

nuevoReporte = {
  asunto: '',
  mensaje: ''
};

cambiarVista(vista: string): void {
this.vistaActual = vista;
}
abrirModalReporte(): void {

  this.mostrarModalReporte = true;

}

cerrarModalReporte(): void {

  this.mostrarModalReporte = false;

}

enviarReporte(): void {

  const reportes =
    JSON.parse(
      localStorage.getItem('reportesAuxiliar') || '[]'
    );

  reportes.push({

    auxiliar: this.auxiliar.nombre,

    fecha:
      new Date().toLocaleString(),

    asunto:
      this.nuevoReporte.asunto,

    mensaje:
      this.nuevoReporte.mensaje,

    respondido: false

  });

  localStorage.setItem(
    'reportesAuxiliar',
    JSON.stringify(reportes)
  );

  alert('Reporte enviado al administrador');

  this.nuevoReporte = {
    asunto: '',
    mensaje: ''
  };

  this.cerrarModalReporte();

}

generarReporte(): void {


this.mensaje =
  '📄 El reporte turístico fue generado exitosamente';

this.tipoMensaje = 'success';

this.mostrarMensaje = true;

setTimeout(() => {
  this.mostrarMensaje = false;
}, 3000);


}

supervisarSistema(): void {


this.mensaje =
  '🖥️ El sistema funciona correctamente';

this.tipoMensaje = 'info';

this.mostrarMensaje = true;

setTimeout(() => {
  this.mostrarMensaje = false;
}, 3000);


}

cerrarSesion(): void {


localStorage.removeItem('usuario');

window.location.href = '/';


}

cargarDatosAuxiliar(): void {


const usuarioGuardado =
  localStorage.getItem('usuario');

if (!usuarioGuardado) {
  return;
}

const usuario =
  JSON.parse(usuarioGuardado);

this.auxiliar.nombre =
  usuario.nombre || '';

this.auxiliar.correo =
  usuario.correo || '';

this.auxiliar.telefono =
  usuario.telefono || '';

}

cargarReservas(): void {


this.reservaService
  .obtenerReservas()
  .subscribe({

    next: (data: any[]) => {

      this.reservas = data;

      console.log(
        'RESERVAS:',
        this.reservas
      );

    },

    error: (error: any) => {

      console.error(
        'Error cargando reservas',
        error
      );

    }

  });


}

cargarTuristas(): void {


this.turistaService
  .listar()
  .subscribe({

    next: (data: any[]) => {

      this.turistas = data;

      console.log(
        'TURISTAS:',
        this.turistas
      );

    },

    error: (error: any) => {

      console.error(
        'Error cargando turistas',
        error
      );

    }

  });

}

cargarGuias(): void {


this.guiaService
  .listarGuias()
  .subscribe({

    next: (data: any[]) => {

      this.guias = data;

      console.log(
        'GUIAS:',
        this.guias
      );

    },

    error: (error: any) => {

      console.error(
        'Error cargando guías',
        error
      );

    }

  });


}

cargarRutas(): void {


this.rutaService
  .obtenerRutas()
  .subscribe({

    next: (data: any[]) => {

      this.rutas = data;

      console.log(
        'RUTAS:',
        this.rutas
      );

    },

    error: (error: any) => {

      console.error(
        'Error cargando rutas',
        error
      );

    }

  });

}

ngOnInit(): void {


this.cargarDatosAuxiliar();

this.cargarReservas();

this.cargarTuristas();

this.cargarGuias();

this.cargarRutas();


}

}
