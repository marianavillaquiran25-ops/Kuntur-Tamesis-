import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { RutaService } from '../../services/ruta.service';
import { TuristaService } from '../../services/turista.service';
import { ReservaService } from '../../services/reserva.service';
import { GuiaService } from '../../services/guia.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  administradorLogueado = {
    nombre: 'Administrador'
  };

  guias: any[] = [];

  totalRutas = 0;
  totalTuristas = 0;
  totalReservas = 0;
  totalAuxiliares = 0;

  reporteVisible = false;
  reporteTexto = '';

  constructor(
    private router: Router,
    private rutaService: RutaService,
    private turistaService: TuristaService,
    private reservaService: ReservaService,
    private guiaService: GuiaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {

    const usuarioGuardado =
      localStorage.getItem('usuario');

    if (usuarioGuardado) {

      const usuario =
        JSON.parse(usuarioGuardado);

      this.administradorLogueado.nombre =
        usuario.nombre;
    }

    this.cargarMetricas();
    this.cargarGuias();
    this.cargarAuxiliares();
    this.cargarReportes();
  }

  cargarMetricas(): void {

    this.rutaService.obtenerRutas().subscribe({
      next: (rutas: any[]) => {
        this.totalRutas = rutas.length;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.turistaService.listar().subscribe({
      next: (turistas: any[]) => {
        this.totalTuristas = turistas.length;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.reservaService.obtenerReservas().subscribe({
      next: (reservas: any[]) => {
        this.totalReservas = reservas.length;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  cargarGuias(): void {

    this.guiaService.listarGuias().subscribe({
      next: (guias: any[]) => {

        this.guias = guias;

        console.log(
          'GUIAS CARGADOS:',
          this.guias
        );
      },

      error: (err: any) => {
        console.error(err);
      }
    });
  }

  cargarAuxiliares(): void {

    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios: any[]) => {

        this.totalAuxiliares =
          usuarios.filter(
            u => u.rol === 'AUXILIAR'
          ).length;
      },

      error: (err: any) => {
        console.error(err);
      }
    });
  }

  irACrearRuta(): void {
    this.router.navigate(['/crear-ruta']);
  }

  irAVerRutas(): void {
    this.router.navigate(['/ver-rutas']);
  }

  irAEditarRuta(id: number): void {
    this.router.navigate(['/editar-ruta', id]);
  }

  irAEliminarRuta(): void {
    this.router.navigate(['/ver-rutas']);
  }

  irAUsuarios(): void {
    this.router.navigate(['/turistas']);
  }

  irAReservas(): void {
    this.router.navigate(['/reservas']);
  }

  irAPagos(): void {
    this.router.navigate(['/pagos']);
  }

  irAGestionUsuarios(): void {
    this.router.navigate(['/gestion-usuarios']);
  }
  reportesAuxiliares: any[] = [];
  vistaActual = 'dashboard';

  cargarReportes(): void {

  const datos =
    localStorage.getItem('reportesAuxiliar');

  if(datos){

    this.reportesAuxiliares =
      JSON.parse(datos);

  }

}

  logout(): void {

    localStorage.removeItem('usuario');

    this.router.navigate(['/']);
  }
}