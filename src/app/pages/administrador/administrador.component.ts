import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})

export class AdministradorComponent {

  administradorLogueado = {
    nombre: 'Administrador'
  };

  reporteVisible = false;

  reporteTexto = '';

  constructor(private router: Router) {}

  // CREAR RUTA
  irACrearRuta() {

    this.router.navigate(['/crear-ruta']);

  }

  // EDITAR RUTA
  irAEditarRuta() {

    this.router.navigate(['/editar-ruta']);

  }

  // ELIMINAR RUTA
  irAEliminarRuta() {

    this.router.navigate(['/eliminar-ruta']);

  }

  // TURISTAS
  irAUsuarios() {

    this.router.navigate(['/turistas']);

  }

  // RESERVAS
  irAReservas() {

    this.router.navigate(['/reservas']);

  }

  // PAGOS
  irAPagos() {

    this.router.navigate(['/pagos']);

  }

  generarReporte() {

    this.reporteVisible = true;

    this.reporteTexto = `

====================================
REPORTE GENERAL KUNTUR TÁMESIS
====================================

✔ Rutas activas: 12

✔ Turistas registrados: 45

✔ Reservas realizadas: 28

✔ Pagos completados: 20

✔ Ingresos estimados: $4.500.000

    `;

  }

  logout() {

    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

}