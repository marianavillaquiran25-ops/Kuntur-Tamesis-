import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-ruta-detalle',
    standalone: true,
      imports: [CommonModule, RouterLink],
        templateUrl: './ruta-detalle.component.html',
          styleUrls: ['./ruta-detalle.component.scss']
          })
          export class RutaDetalleComponent implements OnInit {
          
  ruta: any | null = null;
    cargando = true;
    
  constructor(
      private route: ActivatedRoute,
          private rutaService: RutaService
            ) {}
            
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      
    if (id) {
          this.rutaService.obtenerRuta(Number(id))
                  .subscribe({
                            next: (data) => {
                                        this.ruta = data;
                                                    this.cargando = false;
                                                              },
                                                                        error: () => {
                                                                                    this.cargando = false;
                                                                                              }
                                                                                                      });
                                                                                                          } else {
                                                                                                                this.cargando = false;
                                                                                                                    }
                                                                                                                      }
                                                                                                                      }
                                                                                                                      