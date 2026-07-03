import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private pagoService: PagoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.recargarPagos();

  }

  recargarPagos(): void {

    this.pagoService.obtenerPagos().subscribe({

      next: (data: any[]) => {

        this.pagos = data;

        this.pagosRealizados = data;

        this.pagosPendientes =
          data.filter(
            pago => pago.estado === 'PENDIENTE'
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

  aprobarPago(id: number): void {

    this.pagoService.aprobarPago(id)
      .subscribe({

        next: () => {

          alert('Pago aprobado');

          this.recargarPagos();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  rechazarPago(id: number): void {

    this.pagoService.rechazarPago(id)
      .subscribe({

        next: () => {

          alert('Pago rechazado');

          this.recargarPagos();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  cerrarSesion(): void {

    localStorage.clear();

    window.location.href = '/login';

  }

  volverAdmin(): void {
  this.router.navigate(['/administrador']); 
}

}