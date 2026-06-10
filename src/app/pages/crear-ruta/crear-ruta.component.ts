import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-crear-ruta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.scss']
})
export class CrearRutaComponent {

  constructor(
    private rutaService: RutaService,
    private router: Router
  ) {}

  mensajeExito = false;

  ruta = {
    nombre: '',
    destino: '',
    descripcion: '',
    precio: '',
    duracion: '',
    cupos: '',
    fecha: '',
    hora: '',
    guia: '',
    dificultad: '',
    imagen: '',
    recomendaciones: '',
    atuendos: ''
  };

  crearRuta() {

    const nuevaRuta = {

      nombre: this.ruta.nombre,
      destino: this.ruta.destino,
      descripcion: this.ruta.descripcion,
      imagen: this.ruta.imagen,
      precio: Number(this.ruta.precio),
      cuposDisponibles: Number(this.ruta.cupos),
      duracion: this.ruta.duracion,
      activa: true

    };

    this.rutaService.crearRuta(nuevaRuta)
      .subscribe({

        next: () => {

          this.mensajeExito = true;

          setTimeout(() => {

            this.router.navigate(['/ver-rutas']);

          }, 2000);

        },

        error: (err) => {

          console.error(err);

          alert('Error al crear ruta');

        }

      });

  }

  cerrarSesion() {

    this.router.navigate(['/login']);

  }
  irAVerRutas(): void {
  this.router.navigate(['/ver-rutas']);
}
}