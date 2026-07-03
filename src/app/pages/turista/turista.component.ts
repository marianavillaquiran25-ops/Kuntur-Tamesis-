import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { TuristaService } from '../../services/turista.service';
import { Turista } from '../../models/turista.model';

@Component({
  selector: 'app-turistas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './turista.component.html',
  styleUrls: ['./turista.component.scss']
})
export class TuristasComponent implements OnInit {

  turistas: Turista[] = [];

  cargando = false;
  error = '';
  mensaje = '';

  editandoId: number | null = null;

  mostrarModal = false;

  get modoEdicion(): boolean {
    return this.editandoId !== null;
  }

  readonly form = this.fb.nonNullable.group({

    nombre: ['', Validators.required],

    correo: ['', [Validators.required, Validators.email]],

    documentoIdentidad: ['', Validators.required],

    telefono: ['', Validators.required],

    nacionalidad: [''],

    afeccionesAlergias: [''],

    password: ['', Validators.required]

  });

  readonly filtroDocumento =
    this.fb.nonNullable.control('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly turistaService: TuristaService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {

    this.cargarTuristas();

  }

  volverAdministrador(): void {

    this.router.navigate(['/administrador']);

  }

  abrirModalCrear(): void {

    this.editandoId = null;

    this.form.reset({

      nombre: '',
      correo: '',
      documentoIdentidad: '',
      telefono: '',
      nacionalidad: '',
      afeccionesAlergias: '',
      password: ''

    });

    this.mostrarModal = true;

  }

  cerrarModal(): void {

    this.mostrarModal = false;

    this.cancelarEdicion();

  }

  cargarTuristas(): void {

    this.cargando = true;

    this.error = '';

    this.turistaService.listar().subscribe({

      next: (data: Turista[]) => {

        this.turistas = data;

        this.cargando = false;

      },

      error: (err: HttpErrorResponse) => {

        this.error =
          this.obtenerMensajeError(
            err,
            'No se pudieron cargar los turistas'
          );

        this.cargando = false;

      }

    });

  }

  buscarPorDocumentoIdentidad(): void {

    const documento =
      this.filtroDocumento.value.trim();

    if (!documento) {

      this.cargarTuristas();

      return;

    }

    this.cargando = true;

    this.error = '';

    this.turistaService
      .buscarPorDocumentoIdentidad(documento)
      .subscribe({

        next: (turista: Turista) => {

          this.turistas = [turista];

          this.cargando = false;

        },

        error: (err: HttpErrorResponse) => {

          this.error =
            this.obtenerMensajeError(
              err,
              'No se encontró el turista'
            );

          this.turistas = [];

          this.cargando = false;

        }

      });

  }

  guardar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const payload: Turista =
      this.form.getRawValue();

    this.error = '';

    this.mensaje = '';

    if (this.editandoId !== null) {

      this.actualizarTurista(payload);

      return;

    }

    this.crearTurista(payload);

  }

  private crearTurista(
    payload: Turista
  ): void {

    this.turistaService
      .crear(payload)
      .subscribe({

        next: () => {

          this.mensaje =
            'Turista creado correctamente';

          this.mostrarModal = false;

          this.cancelarEdicion();

          this.cargarTuristas();

        },

        error: (err: HttpErrorResponse) => {

          this.error =
            this.obtenerMensajeError(
              err,
              'No se pudo crear el turista'
            );

        }

      });

  }

  private actualizarTurista(
    payload: Turista
  ): void {

    if (this.editandoId === null) {

      return;

    }

    this.turistaService
      .actualizar(
        this.editandoId,
        payload
      )
      .subscribe({

        next: () => {

          this.mensaje =
            'Turista actualizado correctamente';

          this.mostrarModal = false;

          this.cancelarEdicion();

          this.cargarTuristas();

        },

        error: (err: HttpErrorResponse) => {

          this.error =
            this.obtenerMensajeError(
              err,
              'No se pudo actualizar'
            );

        }

      });

  }

  iniciarEdicion(
    turista: Turista
  ): void {

    this.editandoId =
      turista.id ?? null;

    this.form.patchValue({

      nombre: turista.nombre,

      correo: turista.correo,

      documentoIdentidad:
        turista.documentoIdentidad,

      telefono: turista.telefono,

      nacionalidad:
        turista.nacionalidad ?? '',

      afeccionesAlergias:
        turista.afeccionesAlergias ?? '',

      password:
        turista.password

    });

    this.mostrarModal = true;

  }

  cancelarEdicion(): void {

    this.editandoId = null;

    this.form.reset({

      nombre: '',
      correo: '',
      documentoIdentidad: '',
      telefono: '',
      nacionalidad: '',
      afeccionesAlergias: '',
      password: ''

    });

  }

  eliminar(
    id: number | undefined
  ): void {

    if (id === undefined) {

      return;

    }

    const confirmar = confirm(
      '¿Desea inactivar este turista?'
    );

    if (!confirmar) {

      return;

    }

    this.turistaService
      .eliminar(id)
      .subscribe({

        next: () => {

          this.mensaje =
            'Turista inactivado correctamente';

          this.cargarTuristas();

        },

        error: (err: HttpErrorResponse) => {

          this.error =
            this.obtenerMensajeError(
              err,
              'No se pudo inactivar'
            );

        }

      });

  }

  private obtenerMensajeError(
    err: HttpErrorResponse,
    mensajeDefault: string
  ): string {

    return (
      err.error?.message ||
      mensajeDefault
    );

  }

}

