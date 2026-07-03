import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-ver-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.scss']
})
export class VerReservasComponent implements OnInit {

  reservas: any[] = [];
  cargando = true;
  errorMensaje = '';

  constructor(
    private reservaService: ReservaService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  regresarAlPanel(): void {
    this.router.navigate(['/administrador']); 
  }

  cargarReservas(): void {
    this.cargando = true;
    this.errorMensaje = '';
    this.reservaService.obtenerReservas().subscribe({
      next: (data) => {
        this.reservas = data || [];
        this.cargando = false;
      },
      error: () => {
        this.errorMensaje = 'No se pudo cargar las reservas. Intenta de nuevo más tarde.';
        this.cargando = false;
      }
    });
  }

  eliminarReserva(id: number): void {
    if (!confirm('¿Eliminar esta reserva?')) {
      return;
    }
    this.reservaService.eliminarReserva(id).subscribe({
      next: () => {
        this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
      },
      error: () => {
        alert('No se pudo eliminar la reserva.');
      }
    });
  }
}