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

irACrearRuta() {

this.router.navigate(['/crear-ruta']);

}

irAEditarRuta() {

this.router.navigate(['/editar-ruta']);

}

irAEliminarRuta() {

this.router.navigate(['/eliminar-ruta']);

}

irAUsuarios() {

this.router.navigate(['/ver-usuarios']);

}

irAReservas() {

this.router.navigate(['/ver-reservas']);

}

irAPagos() {

this.router.navigate(['/ver-pagos']);

}

irAConfiguracion() {

this.router.navigate(['/configuracion']);

}

generarReporte() {

this.reporteVisible = true;

this.reporteTexto = `

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