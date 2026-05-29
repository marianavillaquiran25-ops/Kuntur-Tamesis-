import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPagosComponent } from './ver-pagos.component';

describe('VerPagosComponent', () => {
  let component: VerPagosComponent;
  let fixture: ComponentFixture<VerPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
