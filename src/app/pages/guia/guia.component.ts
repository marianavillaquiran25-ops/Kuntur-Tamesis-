import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { TuristaService } from '../../services/turista.service';

@Component({
  selector: 'app-guia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.scss']
})

export class GuiaComponent implements OnInit {

  constructor(
  private rutaService: RutaService,
  private turistaService: TuristaService
) {}

  guia = {
    nombre: 'Carlos Pérez',
    disponible: true
  };

  mostrarRutas = true;

  mostrarTuristas = false;

  rutaSeleccionada: any = null;

  rutas: any[] = [];

  turistas: any[] = [];

  toggleRutas() {

    this.mostrarRutas = true;
    this.mostrarTuristas = false;

  }

  toggleTuristas() {

    this.mostrarTuristas = true;
    this.mostrarRutas = false;

  }

  cambiarDisponibilidad() {

    this.guia.disponible = !this.guia.disponible;

  }

  verDetalles(ruta:any){

    this.rutaSeleccionada = ruta;

  }

  cerrarDetalles(){

    this.rutaSeleccionada = null;

  }

  cerrarSesion() {

    localStorage.clear();

    window.location.href = '/login';

  }
  ngOnInit(): void {

  this.rutaService.obtenerRutas().subscribe({
    next: (data) => {
      this.rutas = data;
    }
  });

  this.turistaService.listar().subscribe({
    next: (data) => {
      this.turistas = data;
    }
  });

}

}