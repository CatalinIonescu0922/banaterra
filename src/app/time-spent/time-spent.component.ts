import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'app-time-spent',
  templateUrl: './time-spent.component.html',
  styleUrls: ['./time-spent.component.css'],
  standalone: true
})
export class TimeSpentComponent implements OnInit, OnDestroy {
  timeSpent: string = '';
  private intervalId: any;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.startTime();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      this.ngZone.runOutsideAngular(() => {
        clearInterval(this.intervalId);
      });
    }
  }

  startTime(): void {
    const startDate = new Date('2010-01-01T00:00:00'); // Your start date with time set to midnight
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.timeSpent = this.calculateTimeSince(startDate);
        });
      }, 1000); // Update every second
    });
  }

  calculateTimeSince(startDate: Date): string {
    const now = new Date();

    // Calculate the differences
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth()+1; //not really the best options , but it works
    let days = now.getDate() - startDate.getDate()+1;     //not really the best options , but it works
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Adjust for negative values
    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    // Ensure all values are non-negative
    years = Math.max(0, years);
    months = Math.max(0, months);
    days = Math.max(0, days);

    return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
  }
}
