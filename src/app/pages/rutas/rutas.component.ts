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

    this.rutaService.obtenerRutas().subscribe({

      next: (data) => {

        this.rutas = data;

      },

      error: (err) => {

        console.error(err);

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