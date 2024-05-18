import { Component } from '@angular/core';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
  inputs: ['image', 'title', 'author', 'genre'],
})
export class QuoteComponent {
  image =  '';
  title = '';
  author = '';
  genre = '';
}
