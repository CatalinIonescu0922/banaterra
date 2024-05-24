import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblicalLongevivsComponent } from './biblical-longevivs.component';

describe('BiblicalLongevivsComponent', () => {
  let component: BiblicalLongevivsComponent;
  let fixture: ComponentFixture<BiblicalLongevivsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiblicalLongevivsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiblicalLongevivsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
