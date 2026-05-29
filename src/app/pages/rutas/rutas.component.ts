import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.scss'
})

export class RutasComponent {

  mostrarModal = false;

  constructor(private router: Router) {}

  reservarRuta() {

    // VALIDAR SI HAY USUARIO
    const usuario = localStorage.getItem('usuario');

    // SI NO HAY LOGIN
    if (!usuario) {

      this.mostrarModal = true;

      return;
    }

    // SI YA INICIÓ SESIÓN
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