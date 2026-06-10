import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RutaService } from '../../services/ruta.service';

@Component({
selector: 'app-ver-rutas',
standalone: true,
imports: [CommonModule],
templateUrl: './ver-rutas.component.html',
styleUrls: ['./ver-rutas.component.scss']
})
export class VerRutasComponent implements OnInit {

rutas: any[] = [];

constructor(
private rutaService: RutaService,
private router: Router
) {}

ngOnInit(): void {
this.cargarRutas();


}

cargarRutas(): void {


this.rutaService.obtenerRutas()
  .subscribe({

    next: (data: any[]) => {

      console.log(data);

      this.rutas = data;

    },

    error: (err: any) => {

      console.error(err);

    }

  });


}

crearRuta(): void {

this.router.navigate(['/crear-ruta']);

}

editarRuta(id: number): void {
this.router.navigate(
  ['/editar-ruta', id]
);

}

eliminarRuta(id: number): void {

if (confirm('¿Deseas eliminar esta ruta?')) {

  this.rutaService.eliminarRuta(id)
    .subscribe({

      next: () => {

        alert('Ruta eliminada correctamente');

        this.cargarRutas();

      },

      error: (err: any) => {

        console.error(err);

        alert('Error al eliminar la ruta');

      }

    });

}

}

volverAdmin(): void {
this.router.navigate(['/administrador']);


}

}
