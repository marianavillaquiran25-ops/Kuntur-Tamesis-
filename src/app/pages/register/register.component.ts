import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  nombre: string = '';
  fechaNacimiento: string = '';
  documentoIdentidad: string = '';
  correo: string = '';
  telefono: string = '';
  password: string = '';
  confirmarPassword: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  registrar() {

    // VALIDAR CONTRASEÑAS
    if (this.password !== this.confirmarPassword) {

      alert('Las contraseñas no coinciden');

      return;
    }

    // OBJETO A ENVIAR
    const datos = {

      nombre: this.nombre,
      fechaNacimiento: this.fechaNacimiento,
      documentoIdentidad: this.documentoIdentidad,
      correo: this.correo,
      telefono: this.telefono,
      password: this.password

    };

    // ENVIAR AL BACKEND
    this.loginService.registrar(datos).subscribe({

      next: (respuesta: any) => {

        console.log('Usuario registrado', respuesta);

        alert('Cuenta creada correctamente');

        // REDIRECCIONAR AL LOGIN
        this.router.navigate(['/login']);
      },

      error: (error: any) => {

        console.log(error);

        alert('Error al registrar usuario');
      }

    });
  }
}