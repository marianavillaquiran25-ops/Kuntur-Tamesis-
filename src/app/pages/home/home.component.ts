import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReservaService } from '../../services/reserva.service';
import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rutas: any[] = [];

  usuario: any = null;

  menuAbierto = false;

  constructor(
    private router: Router,
    private reservaService: ReservaService,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {

    if (typeof window !== 'undefined') {

      const usuarioGuardado = localStorage.getItem('usuario');

      if (usuarioGuardado) {

        this.usuario = JSON.parse(usuarioGuardado);

      }

    }

    this.cargarRutas();

  }

  cargarRutas(): void {

    this.rutaService.obtenerRutas().subscribe({

      next: (data: any[]) => {

        this.rutas = data.slice(0, 4);

      },

      error: (err: any) => {

        console.error(err);

      }

    });

  }

  toggleMenu(): void {

    this.menuAbierto = !this.menuAbierto;

  }

  cerrarSesion(): void {

    if (typeof window !== 'undefined') {

      localStorage.removeItem('usuario');

    }

    this.usuario = null;

    this.router.navigate(['/login']);

  }

  reservarRuta(ruta: any): void {

  if (!this.usuario) {

    alert('Debes iniciar sesión');
    this.router.navigate(['/login']);
    return;

  }

  const reserva = {

    fechaReserva: new Date(),

    estado: 'CONFIRMADA',

    turista: {
      id: this.usuario.id
    },

    ruta: {
      id: ruta.id
    }

  };

  this.reservaService.crearReserva(reserva).subscribe({

    next: () => {

      alert('Reserva realizada correctamente');

    },

    error: (err: any) => {

      console.error(err);

      alert('Error al reservar');

    }

  });
}
}