import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListemargementComponent } from './listemargement.component';

describe('ListemargementComponent', () => {
  let component: ListemargementComponent;
  let fixture: ComponentFixture<ListemargementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListemargementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListemargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
