import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RutaService } from '../../services/ruta.service';
import { TuristaService } from '../../services/turista.service';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  administradorLogueado = {
    nombre: 'Administrador'
  };

  totalRutas = 0;
  totalTuristas = 0;
  totalReservas = 0;

  reporteVisible = false;
  reporteTexto = '';

  constructor(
    private router: Router,
    private rutaService: RutaService,
    private turistaService: TuristaService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {

    this.cargarMetricas();

  }

  cargarMetricas(): void {

    // RUTAS
    this.rutaService.obtenerRutas().subscribe({

      next: (rutas) => {

        this.totalRutas = rutas.length;

      },

      error: (err) => {

        console.error('Error cargando rutas', err);

      }

    });

    // TURISTAS
    this.turistaService.listar().subscribe({

      next: (turistas) => {

        this.totalTuristas = turistas.length;

      },

      error: (err) => {

        console.error('Error cargando turistas', err);

      }

    });

    // RESERVAS
    this.reservaService.obtenerReservas().subscribe({

      next: (reservas) => {

        this.totalReservas = reservas.length;

      },

      error: (err) => {

        console.error('Error cargando reservas', err);

      }

    });

  }

  irACrearRuta() {
    this.router.navigate(['/crear-ruta']);
  }

  irAVerRutas() {
    this.router.navigate(['/ver-rutas']);
  }

  irAEditarRuta(id: number) {
    this.router.navigate(['/editar-ruta', id]);
  }

  irAEliminarRuta() {
    this.router.navigate(['/ver-rutas']);
  }

  irAUsuarios() {
    this.router.navigate(['/turistas']);
  }

  irAReservas() {
    this.router.navigate(['/reservas']);
  }

  irAPagos() {
    this.router.navigate(['/pagos']);
  }

  generarReporte() {

    this.reporteVisible = true;

    this.reporteTexto =
      'REPORTE GENERAL KUNTUR TÁMESIS\n\n' +
      'Rutas registradas: ' + this.totalRutas + '\n\n' +
      'Turistas registrados: ' + this.totalTuristas + '\n\n' +
      'Reservas realizadas: ' + this.totalReservas;

  }

  logout() {

    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

}