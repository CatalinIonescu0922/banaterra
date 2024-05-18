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
  quotes: any[] = [
    { image: '../../assets/img/gustav.jpg', title: 'Morala artei stă chiar în frumuseţea ei.', author: 'Gustave Flaubert', genre: 'Artă, literatură, estetică' },
  ];
}
