import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EtaCalculatorComponent } from './eta-calculator.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EtaCalculatorComponent', () => {
  let component: EtaCalculatorComponent;
  let fixture: ComponentFixture<EtaCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtaCalculatorComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtaCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate time correctly', () => {
    const destinationDate = new Date('2024-12-31T23:59:59');
    const result = component.calculateTimeToDestination(destinationDate);
    expect(result).toContain('years'); // Check for a part of the result, more assertions can be added
  });

  it('should update eta every second', fakeAsync(() => {
    spyOn(component, 'calculateTimeToDestination').and.returnValue('test');
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();
    expect(component.eta).toBe('test');
    component.ngOnDestroy();
  }));
});
