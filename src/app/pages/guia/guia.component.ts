import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.scss']
})

export class GuiaComponent {

  guia = {
    nombre: 'Carlos Pérez',
    disponible: true
  };

  mostrarRutas = true;

  mostrarTuristas = false;

  rutaSeleccionada: any = null;

  rutas = [

    {
      nombre: 'Cerro Cristo Rey',
      destino: 'Támesis Antioquia',
      duracion: '5 horas',
      cantidadTuristas: 20,

      imagen:
      'https://as2.ftcdn.net/jpg/01/50/71/25/1000_F_150712566_zFztzuxCoWGpY07jByPlXjVXOgH7kmHa.jpg',

      descripcion:
      'Una experiencia ecológica y religiosa con una vista panorámica espectacular de Támesis.',

      recomendaciones: [
        'Llevar hidratación',
        'Usar protector solar',
        'No separarse del grupo',
        'Llevar cámara'
      ],

      atuendos: [
        'Tenis cómodos',
        'Ropa deportiva',
        'Gorra',
        'Chaqueta ligera'
      ]
    },

    {
      nombre: 'Ruta De Las Flores',
      destino: 'Támesis Antioquia',
      duracion: '5 horas',
      cantidadTuristas: 20,

      imagen:
      'https://s2.wklcdn.com/image_207/6236761/173845004/108490505Master.jpg',

      descripcion:
      'Un sendero rodeado de naturaleza, montañas y fauna típica antioqueña.',

      recomendaciones: [
        'No arrojar basura',
        'Caminar en grupo',
        'Llevar agua',
        'Seguir las instrucciones del guía'
      ],

      atuendos: [
        'Botas de senderismo',
        'Impermeable',
        'Ropa cómoda',
        'Mochila pequeña'
      ]
    },

    {
      nombre: 'Cascada La Peinada',
      destino: 'Támesis Antioquia',
      duracion: '4 horas',
      cantidadTuristas: 7,

      imagen:
      'https://s2.wklcdn.com/image_33/1005642/29388538/18774224Master.jpg',

      descripcion:
      'Hermosa cascada natural perfecta para disfrutar del paisaje y la aventura.',

      recomendaciones: [
        'No acercarse demasiado al borde',
        'Mantener hidratación',
        'Tener cuidado con las piedras mojadas'
      ],

      atuendos: [
        'Ropa fresca',
        'Tenis antideslizantes',
        'Ropa de cambio'
      ]
    }

  ];

  turistas = [

  {
    nombreCompleto: 'Juan David Gómez',
    telefono: '3104567890',
    documento: '1067854321',
    nacionalidad: 'Colombiano',
    afeccionesAlergias: 'Ninguna'
  },

  {
    nombreCompleto: 'Ana María López',
    telefono: '3209876543',
    documento: '1089456723',
    nacionalidad: 'Mexicana',
    afeccionesAlergias: 'Mariscos'
  },

  {
    nombreCompleto: 'Carlos Andrés Ruiz',
    telefono: '3112223344',
    documento: '1034567890',
    nacionalidad: 'Argentino',
    afeccionesAlergias: 'Penicilina'
  }

];
  

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

}