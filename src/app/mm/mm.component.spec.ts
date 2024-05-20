import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MMComponent } from './mm.component';

describe('HomeComponentComponent', () => {
  let component: MMComponent;
  let fixture: ComponentFixture<MMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
