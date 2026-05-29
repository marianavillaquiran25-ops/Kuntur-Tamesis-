/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministradorComponent } from './administrador.component';
import { AdministradorService } from '../services/administrador.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

describe('AdministradorComponent', () => {
  let component: AdministradorComponent;
  let fixture: ComponentFixture<AdministradorComponent>;
  let mockAdministradorService: any;

  beforeEach(async () => {
    // Creamos un simulacro del servicio
    mockAdministradorService = {
      obtenerReporteGeneral: () => of('Reporte de prueba'),
      eliminarRuta: () => of(true)
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
      ],
      declarations: [AdministradorComponent],
      providers: [
        { provide: AdministradorService, useValue: mockAdministradorService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
