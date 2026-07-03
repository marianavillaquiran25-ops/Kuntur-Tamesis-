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

  mensajeExito = false;

  ruta = {
    nombre: '',
    destino: '',
    descripcion: '',
    precio: 0,
    duracion: '',
    cupos: 0,
    imagen: '',
    activa: true
  };

  constructor(
    private rutaService: RutaService,
    private router: Router
  ) {}

  crearRuta(): void {

    if (!this.ruta.imagen || this.ruta.imagen.trim() === '') {
      alert('Debes ingresar una URL de imagen');
      return;
    }

    const nuevaRuta = {
      nombre: this.ruta.nombre,
      destino: this.ruta.destino,
      descripcion: this.ruta.descripcion,
      imagen: this.ruta.imagen,
      precio: Number(this.ruta.precio),
      cuposDisponibles: Number(this.ruta.cupos),
      duracion: this.ruta.duracion,
      activa: this.ruta.activa
    };

    this.rutaService.crearRuta(nuevaRuta).subscribe({
      next: () => {
        this.mensajeExito = true;

        setTimeout(() => {
          this.router.navigate(['/ver-rutas']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear ruta');
      }
    });
  }

  irAVerRutas(): void {
    this.router.navigate(['/ver-rutas']);
  }

  volverAdmin(): void {
    this.router.navigate(['/administrador']);
  }
}