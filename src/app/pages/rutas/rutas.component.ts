import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.scss'
})

export class RutasComponent implements OnInit {

  mostrarModal = false;

  rutas: any[] = [];

  constructor(
    private router: Router,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {

    this.cargarRutas();

  }

  cargarRutas() {

    this.rutaService.obtenerRutas()
      .subscribe({

        next: (data) => {
          console.log('RUTAS RECIBIDAS');
          console.log(data);
          this.rutas = data;
        
        }

      });

  }

  reservarRuta() {

    const usuario = localStorage.getItem('usuario');

    if (!usuario) {

      this.mostrarModal = true;

      return;

    }

    this.router.navigate(['/reserva']);

  }

  irLogin() {

    this.router.navigate(['/login']);

  }

  irRegister() {

    this.router.navigate(['/register']);

  }

  cerrarModal() {

    this.mostrarModal = false;

  }

}