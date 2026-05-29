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

    this.loginService.obtenerUsuarios().subscribe({

      next: (usuarios: any[]) => {

        const usuarioInput = this.usuario.trim().toLowerCase();

        const passwordInput = this.password.trim();

        const usuarioEncontrado = usuarios.find((u: any) => {

          const correoBD = String(u.correo).trim().toLowerCase();

          const telefonoBD = String(u.telefono).trim();

          const passwordBD = String(u.password).trim();

          return (

            (
              correoBD === usuarioInput ||

              telefonoBD === usuarioInput
            )

            &&

            passwordBD === passwordInput

          );

        });

        // USUARIO ENCONTRADO
        if (usuarioEncontrado) {

          localStorage.setItem(
            'usuario',
            JSON.stringify(usuarioEncontrado)
          );

          this.mensaje = 'Bienvenido';

          this.tipoMensaje = 'success';

          // ADMINISTRADOR
          if (

            usuarioEncontrado.rol === 'ADMINISTRADOR' ||

            usuarioEncontrado.rol === 'administrador'

          ) {

            setTimeout(() => {

              this.router.navigate(['/administrador']);

            }, 1000);

          }

          // TURISTA
          else {

            setTimeout(() => {

              this.router.navigate(['/']);

            }, 1000);

          }

        }

        // ERROR LOGIN
        else {

          this.mensaje = 'Usuario o contraseña incorrectos';

          this.tipoMensaje = 'error';

        }

      },

      error: () => {

        this.mensaje = 'Error al conectar con el servidor';

        this.tipoMensaje = 'error';

      }

    });

  }

}