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
  image =  '';
  title = '';
  author = '';
  genre = '';
  @Input() quote: any;
  /*
  quotes: any[] = [
    { image: '../../assets/img/gustav.jpg', title: 'Morala artei stă chiar în frumuseţea ei.', author: 'Gustave Flaubert', genre: 'Artă, literatură, estetică' },
    {image: '../../assets/img/gustav.jpg', title: 'Ion Marius', author: 'Fiat', genre: 'munte, pescuit' },
  ];
  */
}
