import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRutasComponent } from './ver-rutas.component';

describe('VerRutasComponent', () => {
  let component: VerRutasComponent;
  let fixture: ComponentFixture<VerRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerRutasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
