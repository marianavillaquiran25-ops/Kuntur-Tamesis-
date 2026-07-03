import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-turista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-turista.component.html',
  styleUrls: ['./perfil-turista.component.scss']
})
export class PerfilTuristaComponent implements OnInit {

  id = 0;

  nombre = '';
  correo = '';
  telefono = '';
  documentoIdentidad = '';
  fechaNacimiento = '';

  nacionalidad = '';
  afeccionesAlergias = '';

  fotoPerfil = 'assets/imagenes/logo.jpeg';

  editarPerfilActivo = false;

  usuarioEditando = {
    nombre: '',
    correo: '',
    telefono: '',
    nacionalidad: '',
    afeccionesAlergias: ''
  };

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {

    const usuarioGuardado =
      localStorage.getItem('usuario');

    if (!usuarioGuardado) {

      this.router.navigate(['/login']);

      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    this.id = usuario.id || 0;

    this.nombre = usuario.nombre || '';

    this.correo = usuario.correo || '';

    this.telefono = usuario.telefono || '';

    this.documentoIdentidad =
      usuario.documentoIdentidad || '';

    this.fechaNacimiento =
      usuario.fechaNacimiento || '';

    this.nacionalidad =
      usuario.nacionalidad || '';

    this.afeccionesAlergias =
      usuario.afeccionesAlergias || '';
  }

  irHome(): void {
    this.router.navigate(['/']);
  }

  abrirEditarPerfil(): void {

    this.usuarioEditando = {

      nombre: this.nombre,

      correo: this.correo,

      telefono: this.telefono,

      nacionalidad: this.nacionalidad,

      afeccionesAlergias: this.afeccionesAlergias

    };

    this.editarPerfilActivo = true;
  }

  cerrarEditarPerfil(): void {
    this.editarPerfilActivo = false;
  }

  guardarPerfil(): void {

    this.nombre =
      this.usuarioEditando.nombre;

    this.correo =
      this.usuarioEditando.correo;

    this.telefono =
      this.usuarioEditando.telefono;

    this.nacionalidad =
      this.usuarioEditando.nacionalidad;

    this.afeccionesAlergias =
      this.usuarioEditando.afeccionesAlergias;

    const usuario =
      JSON.parse(
        localStorage.getItem('usuario') || '{}'
      );

    usuario.nombre = this.nombre;

    usuario.correo = this.correo;

    usuario.telefono = this.telefono;

    usuario.nacionalidad = this.nacionalidad;

    usuario.afeccionesAlergias =
      this.afeccionesAlergias;

    localStorage.setItem(
      'usuario',
      JSON.stringify(usuario)
    );

    this.editarPerfilActivo = false;

    alert('Perfil actualizado correctamente');
  }

  onFileSelected(event: any): void {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.fotoPerfil =
        reader.result as string;

    };

    reader.readAsDataURL(file);
  }

  cerrarSesion(): void {

    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
}