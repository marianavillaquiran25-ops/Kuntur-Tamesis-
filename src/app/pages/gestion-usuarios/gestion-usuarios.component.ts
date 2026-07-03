import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-gestion-usuarios',
standalone: true,
templateUrl: './gestion-usuarios.component.html',
styleUrls: ['./gestion-usuarios.component.scss'],
imports: [CommonModule, FormsModule, HttpClientModule]
})
export class GestionUsuariosComponent implements OnInit {

private API_URL = 'http://localhost:8090/api/usuarios';

listaEmpleados: any[] = [];

modalAbierto: boolean = false;

nuevoUsuario: any = {
nombre: '',
documentoIdentidad: '',
correo: '',
telefono: '',
fechaNacimiento: '',
password: '',
rol: 'GUIA',


disponible: true,
turno: 'Mañana',
cargo: 'Administrador'

};

constructor(
private http: HttpClient,
private router: Router
) {}

ngOnInit(): void {
this.cargarEmpleados();
}

cargarEmpleados() {


this.http.get<any[]>(`${this.API_URL}/empleados`)
  .subscribe({

    next: (data) => {

      this.listaEmpleados = data.filter(
        u =>
          u.rol === 'GUIA' ||
          u.rol === 'AUXILIAR' ||
          u.rol === 'ADMINISTRADOR'
      );

    },

    error: (err) => {
      console.error('Error al cargar empleados', err);
    }

  });

}

registrarEmpleado() {

let endpoint = '';

if (this.nuevoUsuario.rol === 'GUIA') {

  endpoint =
    'http://localhost:8090/api/administradores/empleados/guia';

  this.nuevoUsuario.disponible = true;

} else if (this.nuevoUsuario.rol === 'AUXILIAR') {

  endpoint =
    'http://localhost:8090/api/administradores/empleados/auxiliar';

  this.nuevoUsuario.turno = 'Mañana';

} else if (this.nuevoUsuario.rol === 'ADMINISTRADOR') {

  endpoint =
    'http://localhost:8090/api/administradores';

  this.nuevoUsuario.cargo = 'Administrador';

}

this.http.post(endpoint, this.nuevoUsuario)
  .subscribe({

    next: () => {

      alert('Usuario creado correctamente');

      this.cerrarModal();

      this.cargarEmpleados();

      this.limpiarFormulario();

    },

    error: (err) => {

      console.error(err);

      alert(
        'Error al crear el usuario. Verifica documento, correo o teléfono.'
      );

    }

  });

}

abrirModal() {
this.modalAbierto = true;
}

cerrarModal() {
this.modalAbierto = false;
}

volverAdministrador() {
this.router.navigate(['/administrador']);
}

limpiarFormulario() {

this.nuevoUsuario = {

  nombre: '',
  documentoIdentidad: '',
  correo: '',
  telefono: '',
  fechaNacimiento: '',
  password: '',
  rol: 'GUIA',

  disponible: true,
  turno: 'Mañana',
  cargo: 'Administrador'

};

}

}
