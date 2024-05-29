import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererQrcodeComponent } from './generer-qrcode.component';

describe('GenererQrcodeComponent', () => {
  let component: GenererQrcodeComponent;
  let fixture: ComponentFixture<GenererQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenererQrcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenererQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
