import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { QuoteComponent } from '../quote/quote.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topic-content',
  standalone: true,
  imports: [QuoteComponent, CommonModule],
  templateUrl: './topic-content.component.html',
  styleUrl: './topic-content.component.css'
})
export class TopicContentComponent implements OnInit, OnDestroy {
  quotes = [
    { image: '../../assets/img/gustav.jpg', title: 'Morala artei stă chiar în frumuseţea ei.', author: 'Gustave Flaubert', genre: 'Artă, literatură, estetică' },
    { image: '../../assets/img/gustav.jpg', title: 'Ion Marius', author: 'Fiat', genre: 'Munte, Pescuit' }
  ];
  currentQuote: any = null;

  selectQuote(index: number): void {
    this.currentQuote = this.quotes[index];
  }

  imagePath!: string;
  languageSubscription!: Subscription;
  buttonLabels: string[][] = [];
  headerLabel: string = '';

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage.subscribe(lang => {
      if (lang === 'english') {
        this.imagePath = '../../assets/img/eng_topics.png';
      } else {
        this.imagePath = '../../assets/img/banner_topics.jpg';
      }
      const languageData = this.languageService.getLabels(lang);
      this.buttonLabels = this.chunkArray(languageData.topics, 5);
      this.headerLabel = languageData.header;
    });
  }
  chunkArray(items: string[], chunkSize: number): string[][] {
    const chunks = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      chunks.push(items.slice(i, i + chunkSize));
    }
    return chunks;
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}


