import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TimeSpentComponent } from './time-spent.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TimeSpentComponent', () => {
  let component: TimeSpentComponent;
  let fixture: ComponentFixture<TimeSpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSpentComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate time correctly', () => {
    const startDate = new Date('2010-01-01');
    const result = component.calculateTimeSince(startDate);
    expect(result).toContain('years'); // Check for a part of the result, more assertions can be added
  });

  it('should update timeSpent every second', fakeAsync(() => {
    spyOn(component, 'calculateTimeSince').and.returnValue('test');
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();
    expect(component.timeSpent).toBe('test');
    component.ngOnDestroy();
  }));
});
