import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralComponent } from './admin-general.component';

describe('AdminGeneralComponent', () => {
  let component: AdminGeneralComponent;
  let fixture: ComponentFixture<AdminGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
