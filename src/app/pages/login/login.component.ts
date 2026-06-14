import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario: string = '';

  password: string = '';

  mensaje: string = '';

  tipoMensaje: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  iniciarSesion() {

    this.mensaje = '';

    this.loginService.login({
      correo: this.usuario,
      password: this.password
    }).subscribe({

      next: (usuarioEncontrado: any) => {

        localStorage.setItem(
          'usuario',
          JSON.stringify(usuarioEncontrado)
        );

        this.mensaje = 'Bienvenido';
        this.tipoMensaje = 'success';

        setTimeout(() => {

          if (
            usuarioEncontrado.rol === 'ADMINISTRADOR' ||
            usuarioEncontrado.rol === 'administrador'
          ) {

            this.router.navigate(['/administrador']);

          }

          else if (
            usuarioEncontrado.rol === 'GUIA' ||
            usuarioEncontrado.rol === 'guia' ||
            usuarioEncontrado.rol === 'Guia'
          ) {

            this.router.navigate(['/guia']);

          }

          else if (
            usuarioEncontrado.rol === 'AUXILIAR' ||
            usuarioEncontrado.rol === 'auxiliar' ||
            usuarioEncontrado.rol === 'Auxiliar'
          ) {

            this.router.navigate(['/auxiliar']);

          }

          else {

            this.router.navigate(['/']);

          }

        }, 1000);

      },

      error: () => {

        this.mensaje = 'Usuario o contraseña incorrectos';
        this.tipoMensaje = 'error';

      }

    });

  }

}