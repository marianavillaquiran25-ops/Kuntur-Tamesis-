import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuristaService } from '../../services/turista.service';
import { Turista } from '../../models/turista.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.email]],
    documentoIdentidad: ['', [Validators.required]],
    telefono: [''],
    direccion: [''],
    password: ['']
  });

  readonly filtroDocumento = this.fb.nonNullable.control('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly turistaService: TuristaService
  ) {}

  ngOnInit(): void {
    this.cargarTuristas();
  }

  private cargarTuristas(): void {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.turistaService.listar().subscribe({
      next: (data: Turista[]) => {
        this.turistas = data;
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.obtenerMensajeError(err, 'No se pudo listar turistas');
        this.cargando = false;
      }
    });
  }

  buscarPorDocumentoIdentidad(): void {
    const documentoIdentidad = this.filtroDocumento.value.trim();
    if (!documentoIdentidad) {
      this.cargarTuristas();
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.turistaService.buscarPorDocumentoIdentidad(documentoIdentidad).subscribe({
      next: (turista: Turista) => {
        this.turistas = [turista];
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.obtenerMensajeError(err, 'No se encontró turista con ese documento de identidad');
        this.turistas = [];
        this.cargando = false;
      }
    });
  }

  limpiarBusqueda(): void {
    this.filtroDocumento.setValue('');
    this.cargarTuristas();
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.mensaje = '';
    const payload: Turista = this.form.getRawValue();

    if (this.editandoId !== null) {
      this.turistaService.actualizar(this.editandoId, payload).subscribe({
        next: () => {
          this.mensaje = 'Turista actualizado correctamente';
          this.cancelarEdicion();
          this.cargarTuristas();
        },
        error: (err: HttpErrorResponse) => {
          this.error = this.obtenerMensajeError(err, 'No se pudo actualizar el turista');
        }
      });
      return;
    }

    this.turistaService.crear(payload).subscribe({
      next: () => {
        this.mensaje = 'Turista creado correctamente';
        this.form.reset({
          nombre: '',
          correo: '',
          documentoIdentidad: '',
          telefono: '',
          direccion: '',
          password: ''
        });
        this.cargarTuristas();
      },
      error: (err: HttpErrorResponse) => {
        this.error = this.obtenerMensajeError(err, 'No se pudo crear turista');
      }
    });
  }

  iniciarEdicion(turista: Turista): void {
    this.editandoId = turista.id ?? null;
    this.form.patchValue({
      nombre: turista.nombre,
      correo: turista.correo,
      documentoIdentidad: turista.documentoIdentidad,
      telefono: turista.telefono,
      direccion: turista.direccion,
      password: turista.password
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset({
      nombre: '',
      correo: '',
      documentoIdentidad: '',
      telefono: '',
      direccion: '',
      password: ''
    });
  }

  private obtenerMensajeError(err: HttpErrorResponse, mensajeDefault: string): string {
    return err.error?.message ?? mensajeDefault;
  }

  eliminar(id: number | undefined): void {
    if (id === undefined) {
      return;
    }
            const confirmar = confirm('¿Está seguro de eliminar este turista?');
            if (!confirmar) {
                return;
            }

            this.error = '';
            this.mensaje = '';

            this.turistaService.eliminar(id).subscribe({
                next: () => {
                    this.mensaje = 'Turista eliminado correctamente';
                    this.cargarTuristas();
                },
                error: (err: HttpErrorResponse) => {
                    this.error = this.obtenerMensajeError(err, 'No se pudo eliminar el turista');
                }
            });
        }
    }

  
