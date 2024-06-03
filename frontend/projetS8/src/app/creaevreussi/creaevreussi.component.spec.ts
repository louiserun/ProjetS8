import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaevreussiComponent } from './creaevreussi.component';

describe('CreaevreussiComponent', () => {
  let component: CreaevreussiComponent;
  let fixture: ComponentFixture<CreaevreussiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaevreussiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaevreussiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
