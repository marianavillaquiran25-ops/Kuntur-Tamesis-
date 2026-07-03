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
        localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));

        this.mensaje = 'Bienvenido';
        this.tipoMensaje = 'success';

        setTimeout(() => {
          const rol = usuarioEncontrado.rol?.toUpperCase();

          if (rol === 'ADMINISTRADOR') {
            this.router.navigate(['/administrador']);
          } else if (rol === 'GUIA') {
            this.router.navigate(['/guia']);
          } else if (rol === 'AUXILIAR') {
            this.router.navigate(['/auxiliar']);
          } else {
            this.router.navigate(['/']);
          }
        }, 1000);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.mensaje = 'Usuario o contraseña incorrectos';
        this.tipoMensaje = 'error';
      }
    });
  }
}