import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
  inputs: ['image', 'title', 'author', 'genre'],
})
export class QuoteComponent {
  image =  '';
  title = '';
  author = '';
  genre = '';
  quotes: any[] = [
    { image: '../../assets/img/gustav.jpg', title: 'Morala artei stă chiar în frumuseţea ei.', author: 'Gustave Flaubert', genre: 'Artă, literatură, estetică' },
  ];
}
