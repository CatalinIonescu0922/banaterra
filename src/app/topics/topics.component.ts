import { Component } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-topics',
    standalone: true,
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css'],
    imports: [QuoteComponent, CommonModule]
})
export class TopicsComponent {
  showQuote = false;

  // Method to toggle the visibility of the QuoteComponent
  toggleQuoteDisplay() {
    this.showQuote = !this.showQuote;
    console.log("toggleQuoteDisplay called, showQuote is: ", this.showQuote);
  }
}
