import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RutaService } from '../../services/ruta.service';
import { ReservaService } from '../../services/reserva.service';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-ruta-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './ruta-detalle.component.html',
  styleUrls: ['./ruta-detalle.component.scss']
})
export class RutaDetalleComponent implements OnInit {

  ruta: any = null;

  cargando = true;

  tieneAfeccion: string = 'No';

  afeccionesAlergias: string = '';

  formulario = {
    nombre: '',
    correo: '',
    telefono: '',
    fecha: '',
    metodoPago: '',
    observaciones: ''
  };

  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService,
    private reservaService: ReservaService,
    private pagoService: PagoService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.rutaService.obtenerRuta(Number(id))
        .subscribe({

          next: (data) => {

            this.ruta = data;
            this.cargando = false;

          },

          error: (err) => {

            console.error(err);
            this.cargando = false;

          }

        });

    } else {

      this.cargando = false;

    }

  }

confirmarReserva(): void {

  console.log('BOTON PRESIONADO');

  if (!this.ruta) {
    alert('No se encontró la ruta');
    return;
  }

  const usuarioGuardado = localStorage.getItem('usuario');

  if (!usuarioGuardado) {
    alert('Debes iniciar sesión');
    return;
  }

  const usuario = JSON.parse(usuarioGuardado);

  const reserva = {

    fechaReserva: new Date(),

    estado: 'CONFIRMADA',

    turista: {
      id: usuario.id
    },

    ruta: {
      id: this.ruta.id
    }

  };

  console.log('RESERVA A ENVIAR:', reserva);

  this.reservaService.crearReserva(reserva)
    .subscribe({

      next: (data) => {

  console.log('RESPUESTA BACKEND:', data);

  const pago = {

    monto: this.ruta.precio,

    fecha: new Date(),

    metodoPago: this.formulario.metodoPago,

    estado: 'PENDIENTE',

    turista: {
      id: usuario.id
    },

    ruta: {
      id: this.ruta.id
    }

  };

  this.pagoService.crearPago(pago)
    .subscribe({

      next: () => {

        alert(
          'Reserva realizada correctamente y pago registrado'
        );

      },

      error: (error) => {

        console.error(
          'Error guardando pago',
          error
        );

      }

    });

},
      error: (err: any) => {

        console.error(err);

        if (err.error?.message) {

          alert(err.error.message);

        } else {

          alert('No hay cupos disponibles');

        }

      }

    });

}
}