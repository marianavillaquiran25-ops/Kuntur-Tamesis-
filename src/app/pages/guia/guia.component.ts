import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RutaService } from '../../services/ruta.service';
import { ReservaService } from '../../services/reserva.service';
import { GuiaService } from '../../services/guia.service';

@Component({
  selector: 'app-guia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.scss']
})
export class GuiaComponent implements OnInit {

  constructor(
  private rutaService: RutaService,
  private reservaService: ReservaService,
  private guiaService: GuiaService

) {}

  rutasAsignadas: any[] = [];

  turistasAsignados: any[] = [];

  fotoUrl = 'assets/imagenes/default-user.png';

  seccionActiva = 'dashboard';

  disponible = true;

  mostrarModal = false;

  mostrarDetalleRuta = false;

  perfil: any = {
    nombre: '',
    profesion: 'Guía Turístico',
    correo: '',
    telefono: '',
    ciudad: '',
    miembro: '',
    idiomas: 'Español',
    descripcion: 'Guía turístico de Kuntur Támesis.'
  };

  rutaSeleccionada: any = null;

  ngOnInit(): void {

    this.cargarDatosGuia();
    this.cargarRutasAsignadas();

  }

  cargarDatosGuia(): void {

  if (typeof window === 'undefined') {
    return;
  
  }
  

  const usuarioGuardado = window.localStorage.getItem('usuario');

  console.log('LOCALSTORAGE GUIA:', usuarioGuardado);

  if (!usuarioGuardado) {
    return;
  }

  const usuario = JSON.parse(usuarioGuardado);

  this.disponible =
  usuario.disponible ?? true;

  this.perfil.nombre = usuario.nombre || '';
  this.perfil.correo = usuario.correo || '';
  this.perfil.telefono = usuario.telefono || '';
  this.perfil.ciudad = usuario.ciudad || '';

  if (usuario.fechaNacimiento) {

    const fecha = new Date(usuario.fechaNacimiento);

    this.perfil.miembro =
      fecha.getFullYear().toString();

  }

  }

  cambiarSeccion(seccion: string) {

    this.seccionActiva = seccion;

  }

  toggleDisponibilidad() {

  this.disponible = !this.disponible;

  this.guiaService
      .actualizarDisponibilidad(
          this.perfil.id,
          this.disponible
      )
      .subscribe({

        next: () => {

          console.log(
            'Disponibilidad actualizada'
          );

        },

        error: (err: any) => {

          console.error(err);

        }

      });

}

  editarPerfil() {

    this.mostrarModal = true;

  }

  cerrarModal() {

    this.mostrarModal = false;

  }

  guardarPerfil() {

    alert('Perfil actualizado correctamente');

    this.mostrarModal = false;

  }

  cerrarSesion() {

    if(typeof window !=='undefined'){

    localStorage.removeItem('usuario');

    window.location.href = '/';

  }
  }
  abrirDetalleRuta(ruta: any): void {

  this.rutaSeleccionada = ruta;

  this.mostrarDetalleRuta = true;

  console.log('RUTA SELECCIONADA:', ruta);

  this.reservaService
    .obtenerReservasPorRuta(ruta.id)
    .subscribe({

      next: (reservas: any[]) => {

        console.log('RESERVAS ENCONTRADAS:', reservas);

        this.turistasAsignados =
          reservas
            .filter(r => r.turista)
            .map(r => r.turista);

        console.log(
          'TURISTAS:',
          this.turistasAsignados
        );

      },

      error: (err: any) => {

        console.error(
          'ERROR CARGANDO RESERVAS',
          err
        );

      }

    });

  this.mostrarDetalleRuta = true;

}

  cerrarDetalleRuta() {

    this.mostrarDetalleRuta = false;

  }

  seleccionarFoto(event: any) {

    const archivo = event.target.files[0];

    if (archivo) {

      const reader = new FileReader();

      reader.onload = () => {

        this.fotoUrl =
          reader.result as string;

      };

      reader.readAsDataURL(archivo);

    }

  }

  cargarRutasAsignadas(): void {

  if (typeof window === 'undefined') {
    return;
  }

  const usuarioGuardado =
    window.localStorage.getItem('usuario');

  if (!usuarioGuardado) {
    return;
  }

  const guia = JSON.parse(usuarioGuardado);

  this.rutaService.obtenerRutas()
    .subscribe({

      next: (rutas: any[]) => {

        this.rutasAsignadas = rutas.filter(r => {

          if (!r.guia) return false;

          if (typeof r.guia === 'number') {
            return r.guia === guia.id;
          }

          return r.guia.id === guia.id;

        });

        console.log(
          'RUTAS ASIGNADAS:',
          this.rutasAsignadas
        );

      },

      error: (err) => {

        console.error(err);

      }

    });

}
}

