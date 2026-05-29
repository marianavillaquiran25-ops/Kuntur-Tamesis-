import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  menuAbierto = false;

  usuario: any = null;

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) {

    // VALIDAR QUE ESTÉ EN EL NAVEGADOR
    if (typeof window !== 'undefined' && localStorage) {

      const usuarioGuardado = localStorage.getItem('usuario');

      if (usuarioGuardado) {

        this.usuario = JSON.parse(usuarioGuardado);

      }

    }

  }

  toggleMenu() {

    this.menuAbierto = !this.menuAbierto;

  }

  cerrarSesion() {

    if (typeof window !== 'undefined' && localStorage) {

      localStorage.removeItem('usuario');

    }

    this.usuario = null;

    alert('Sesión cerrada');

  }

  reservarRuta() {

    // SI NO HAY LOGIN
    if (!this.usuario) {

      alert('Debes iniciar sesión');

      this.router.navigate(['/login']);

      return;

    }

    // DATOS RESERVA
    const reserva = {

      fechaReserva: new Date(),

      estado: 'CONFIRMADA',

      turista: {
        id: this.usuario.id
      },

      ruta: {
        id: 1
      }

    };

    // ENVIAR AL BACKEND
    this.reservaService.crearReserva(reserva).subscribe({

      next: (respuesta) => {

        console.log(respuesta);

        alert('Reserva realizada correctamente');

      },

      error: (error) => {

        console.log(error);

        alert('Error al reservar');

      }

    });

  }

}