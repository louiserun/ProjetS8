import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaEvComponent } from './crea-ev.component';

describe('CreaEvComponent', () => {
  let component: CreaEvComponent;
  let fixture: ComponentFixture<CreaEvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaEvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
