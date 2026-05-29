import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDetalleComponent } from './ruta-detalle.component';

describe('RutaDetalleComponent', () => {
  let component: RutaDetalleComponent;
  let fixture: ComponentFixture<RutaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
