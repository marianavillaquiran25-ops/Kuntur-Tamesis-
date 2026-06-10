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

totalRutas = 0;
totalTuristas = 0;
totalReservas = 0;

reporteVisible = false;
reporteTexto = '';

constructor(private router: Router) {}

irACrearRuta() {
this.router.navigate(['/crear-ruta']);
}

irAVerRutas() {
this.router.navigate(['/ver-rutas']);
}

irAEditarRuta() {
this.router.navigate(['/editar-ruta']);
}

irAEliminarRuta() {
this.router.navigate(['/eliminar-ruta']);
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
