import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-editar-ruta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.scss']
})
export class EditarRutaComponent implements OnInit {

  ruta: any = {
    id: '',
    nombre: '',
    destino: '',
    descripcion: '',
    precio: '',
    duracion: '',
    cuposDisponibles: ''
  };

  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!id || isNaN(id)) {
      alert('ID de ruta no válido');
      this.router.navigate(['/ver-rutas']);
      return;
    }

    this.cargarRuta(id);
  }

  cargarRuta(id: number): void {
    this.rutaService.obtenerRuta(id)
      .subscribe({
        next: (data: any) => {
          this.ruta = {
            id: data.id,
            nombre: data.nombre,
            destino: data.destino,
            descripcion: data.descripcion,
            precio: data.precio,
            duracion: data.duracion,
            cuposDisponibles: data.cuposDisponibles,
            activa: data.activa,
            imagen: data.imagen
};
          this.cargando = false;
        },
        error: (err: any) => {
          console.error(err);
          alert('Error al cargar la ruta');
          this.router.navigate(['/ver-rutas']);
        }
      });
  }

  actualizarRuta(): void {
    const id = Number(this.ruta.id);
    if (!id || isNaN(id)) {
      alert('ID de ruta no válido');
      return;
    }

   const rutaActualizada = {

    nombre: this.ruta.nombre,
    destino: this.ruta.destino,
    descripcion: this.ruta.descripcion,
    precio: Number(this.ruta.precio),
    duracion: this.ruta.duracion,
    cuposDisponibles: Number(this.ruta.cuposDisponibles),
    activa: this.ruta.activa,
    imagen: this.ruta.imagen
  };

    this.rutaService.actualizarRuta(id, rutaActualizada)
      .subscribe({
        next: () => {
          alert('Ruta actualizada correctamente');
          this.router.navigate(['/ver-rutas']);
        },
        error: (err: any) => {
          console.error(err);
          alert('Error al actualizar la ruta');
        }
      });
  }

  volver(): void {
    this.router.navigate(['/ver-rutas']);
  }

}