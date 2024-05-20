import { Component } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-topics',
    standalone: true,
    templateUrl: './topics.component.html',
    styleUrl: './topics.component.css',
    imports: [QuoteComponent, CommonModule]
})
export class TopicsComponent {
  
}
