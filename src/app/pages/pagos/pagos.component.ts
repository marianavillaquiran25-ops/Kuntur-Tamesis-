import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})

export class PagosComponent {

  mostrarPagos = true;

  mostrarPendientes = false;

  pagoSeleccionado:any = null;

  pagos = [

    {
      turista:'Juan Gómez',
      ruta:'Cerro Cristo Rey',
      valor:'$180.000',
      metodo:'Nequi',
      fecha:'26/05/2026',
      estado:'Pagado',
      comprobante:'https://images.unsplash.com/photo-1554224155-6726b3ff858f'
    },

    {
      turista:'Ana López',
      ruta:'Cascada La Peinada',
      valor:'$220.000',
      metodo:'Transferencia',
      fecha:'25/05/2026',
      estado:'Pendiente',
      comprobante:'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e'
    },

    {
      turista:'Carlos Ruiz',
      ruta:'Sendero Natural',
      valor:'$150.000',
      metodo:'Tarjeta',
      fecha:'24/05/2026',
      estado:'Pagado',
      comprobante:'https://images.unsplash.com/photo-1563013544-824ae1b704d3'
    }

  ];

  // TODOS LOS PAGOS

  pagosRealizados = this.pagos;

  // SOLO PENDIENTES

  pagosPendientes = this.pagos.filter(

    pago => pago.estado === 'Pendiente'

  );

  // MOSTRAR PAGOS

  verPagos(){

    this.mostrarPagos = true;

    this.mostrarPendientes = false;

  }

  // MOSTRAR PENDIENTES

  verPendientes(){

    this.mostrarPagos = false;

    this.mostrarPendientes = true;

  }

  // MODAL

  abrirComprobante(pago:any){

    this.pagoSeleccionado = pago;

  }

  cerrarModal(){

    this.pagoSeleccionado = null;

  }

  // CERRAR SESION

  cerrarSesion(){

    localStorage.clear();

    window.location.href = '/login';

  }

}