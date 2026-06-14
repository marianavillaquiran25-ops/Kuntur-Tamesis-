import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoService } from '../../services/pago.service';

@Component({
selector: 'app-pagos',
standalone: true,
imports: [CommonModule],
templateUrl: './pagos.component.html',
styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

mostrarPagos = true;

mostrarPendientes = false;

pagoSeleccionado: any = null;

pagos: any[] = [];

pagosRealizados: any[] = [];

pagosPendientes: any[] = [];

constructor(
private pagoService: PagoService
) {}

ngOnInit(): void {
this.pagoService.obtenerPagos().subscribe({

  next: (data: any[]) => {

    this.pagos = data;

    this.pagosRealizados = data;

    this.pagosPendientes = data.filter(

      pago => pago.estado === 'Pendiente'

    );

  },

  error: (err: any) => {

    console.error(err);

  }

});

}

verPagos(): void {
this.mostrarPagos = true;
this.mostrarPendientes = false;

}

verPendientes(): void {
this.mostrarPagos = false;
this.mostrarPendientes = true;

}

abrirComprobante(pago: any): void {
this.pagoSeleccionado = pago;

}

cerrarModal(): void {
this.pagoSeleccionado = null;

}

cerrarSesion(): void {


localStorage.clear();

window.location.href = '/login';

}

}
