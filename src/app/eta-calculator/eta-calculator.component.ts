import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'app-eta',
  templateUrl: './eta-calculator.component.html',
  styleUrls: ['./eta-calculator.component.css'],
  standalone: true
})
export class EtaCalculatorComponent implements OnInit, OnDestroy {
  eta: string = '';
  private intervalId: any;
  private destinationDate: Date;

  constructor(private ngZone: NgZone) {
    // Initialize the destination date
    this.destinationDate = new Date('2024-12-31T23:59:59'); // Example: New Year's Eve 2024
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdown(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.eta = this.calculateTimeToDestination(this.destinationDate);
        });
      }, 1000); // Update every second
    });
  }

  calculateTimeToDestination(destinationDate: Date): string {
    const now = new Date();
    let years = destinationDate.getFullYear() - now.getFullYear();
    let months = destinationDate.getMonth() - now.getMonth();
    let days = destinationDate.getDate() - now.getDate();
    let hours = destinationDate.getHours() - now.getHours();
    let minutes = destinationDate.getMinutes() - now.getMinutes();
    let seconds = destinationDate.getSeconds() - now.getSeconds();

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
      const previousMonth = new Date(destinationDate.getFullYear(), destinationDate.getMonth(), 0).getDate();
      days += previousMonth;
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    return `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
  }
}
