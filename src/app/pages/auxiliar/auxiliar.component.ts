import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { TuristaService } from '../../services/turista.service';

@Component({
  selector: 'app-auxiliar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.scss']
})

export class AuxiliarComponent implements OnInit {

  constructor(
  private reservaService: ReservaService,
  private turistaService: TuristaService
) {}

  auxiliar = {
    nombre: 'Laura Gómez',
    disponible: true
  };

  vistaActual = 'dashboard';

  reservas: any[] = [];

  turistas: any[] = [];


  cambiarVista(vista:string){

    this.vistaActual = vista;

  }

  cambiarDisponibilidad(){

    this.auxiliar.disponible =
    !this.auxiliar.disponible;

  }

 mensaje = '';

mostrarMensaje = false;

tipoMensaje = '';

generarReporte(){

  this.mensaje =
  '📄 El reporte turístico fue generado exitosamente.';

  this.tipoMensaje = 'success';

  this.mostrarMensaje = true;

  setTimeout(() => {

    this.mostrarMensaje = false;

  }, 3000);

}

supervisarSistema(){

  this.mensaje =
  '🖥️ El sistema está funcionando correctamente y sin errores.';

  this.tipoMensaje = 'info';

  this.mostrarMensaje = true;

  setTimeout(() => {

    this.mostrarMensaje = false;

  }, 3000);

}

  cerrarSesion(){

    localStorage.clear();

    window.location.href = '/login';

  }

  ngOnInit(): void {

  this.reservaService.obtenerReservas().subscribe({
    next: (data) => {
      this.reservas = data;
    }
  });

  this.turistaService.listar().subscribe({
    next: (data) => {
      this.turistas = data;
    }
  });

}

}