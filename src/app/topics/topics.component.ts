import { Component } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-topics',
    standalone: true,
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css'],
    imports: [QuoteComponent, CommonModule,NavBarComponent,FooterComponent]
})

export class TopicsComponent {
  quotes = [
    { image: '../../assets/img/gustav.jpg', title: 'Morala artei stă chiar în frumuseţea ei.', author: 'Gustave Flaubert', genre: 'Artă, literatură, estetică' },
    { image: '../../assets/img/gustav.jpg', title: 'Ion Marius', author: 'Fiat', genre: 'Munte, Pescuit' }
  ];
  currentQuote: any = null;

  selectQuote(index: number): void {
    this.currentQuote = this.quotes[index];
  }
}
