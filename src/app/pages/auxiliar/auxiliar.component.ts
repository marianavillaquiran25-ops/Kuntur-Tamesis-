import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auxiliar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.scss']
})

export class AuxiliarComponent {

  auxiliar = {
    nombre: 'Laura Gómez',
    disponible: true
  };

  vistaActual = 'dashboard';

  reservas = [

    {
      turista: 'Juan Pérez',
      ruta: 'Cerro Cristo Rey',
      fecha: '28/05/2026',
      estado: 'Confirmada'
    },

    {
      turista: 'Ana López',
      ruta: 'Cascada La Peinada',
      fecha: '30/05/2026',
      estado: 'Pendiente'
    }

  ];

  turistas = [

    {
      nombre: 'Carlos Ruiz',
      nacionalidad: 'Colombiano',
      telefono: '3104567890'
    },

    {
      nombre: 'María Torres',
      nacionalidad: 'Mexicana',
      telefono: '3209876543'
    }

  ];

  cambiarVista(vista:string){

    this.vistaActual = vista;

  }

  cambiarDisponibilidad(){

    this.auxiliar.disponible =
    !this.auxiliar.disponible;

  }

 mensaje = '';

mostrarMensaje = false;

tipoMensaje = '';

generarReporte(){

  this.mensaje =
  '📄 El reporte turístico fue generado exitosamente.';

  this.tipoMensaje = 'success';

  this.mostrarMensaje = true;

  setTimeout(() => {

    this.mostrarMensaje = false;

  }, 3000);

}

supervisarSistema(){

  this.mensaje =
  '🖥️ El sistema está funcionando correctamente y sin errores.';

  this.tipoMensaje = 'info';

  this.mostrarMensaje = true;

  setTimeout(() => {

    this.mostrarMensaje = false;

  }, 3000);

}

  cerrarSesion(){

    localStorage.clear();

    window.location.href = '/login';

  }

}