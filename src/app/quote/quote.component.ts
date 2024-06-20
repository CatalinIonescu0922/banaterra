import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
  inputs: ['image', 'title', 'author', 'genre'],
})
export class QuoteComponent {
  @Input() quote: any;
}
