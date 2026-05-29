import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRutaComponent } from './eliminar-ruta.component';

describe('EliminarRutaComponent', () => {
  let component: EliminarRutaComponent;
  let fixture: ComponentFixture<EliminarRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarRutaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
