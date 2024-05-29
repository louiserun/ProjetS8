import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPresComponent } from './conf-pres.component';

describe('ConfPresComponent', () => {
  let component: ConfPresComponent;
  let fixture: ComponentFixture<ConfPresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfPresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
