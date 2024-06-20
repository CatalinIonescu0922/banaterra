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
    { image: '../../assets/img/gustav.jpg', title: 'Un om modest, care se bălăcește cu rucsacul sau geanta în potop, este o priveliște tristă, dar nu atât de revelatoare: se pare că a trăit întotdeauna aproape de necazuri, chiar dacă tot ce are s-a dus, se va ridica mai devreme sau mai târziu. Dar când fericirea visată se prăbușește, există întotdeauna ceva revelator: ca și cum peisajul unui basm a fost măturat de un uragan sau spălat de un val indiferent.', author: 'Müller Péter', genre: 'fericire, bătălie' },
    {
      image: '../../assets/img/gustav.jpg',
      title: 'Ceea ce știam, am aflat mai târziu că nu știam bine, a trebuit să reevaluez, dar ceea ce am crezut a fost întotdeauna valabil și încă este. Și întotdeauna va fi.',
      author: 'Müller Péter',
      genre: 'credință'
    },
    {
      image: '../../assets/img/gustav.jpg',
      title: 'Miracolele sunt pentru cei care cred în ele.',
      author: 'Müller Péter',
      genre: 'credință'
    },
    {
      image: '../../assets/img/gustav.jpg',
      title: 'Dacă ați fi crezut, ați fi știut că soarele nu numai că apune, dar și răsare din nou a doua zi.',
      author: 'Müller Péter',
      genre: 'credință'
    },
    {
      image: '../../assets/img/gustav.jpg',
      title: 'Mai întâi trebuie să crezi în credință, iar abia apoi vei primi o credință adevărată.',
      author: 'Müller Péter',
      genre: 'credință'
    }
  ];
  currentQuote: any = null;
  currentQuotes: any[] = [];

  selectQuote(index: number): void {
    console.log('Button clicked with index:', index);  // Debugging line
    switch (index) {
      case 0:
        console.log('Selecting first quote:', this.quotes[0]);  // Debugging line
        this.currentQuote = this.quotes[0];
        this.currentQuotes = []; // Clear the array when displaying a single quote
        break;
      case 1:
        console.log('Selecting quotes from 1 to 4', this.quotes.slice(1, 5));  // Debugging line
        this.currentQuotes = this.quotes.slice(1, 5);
        this.currentQuote = null; // Clear the single quote when displaying multiple
        break;
      default:
        console.log('Clearing all quotes');  // Debugging line
        this.currentQuote = null;
        this.currentQuotes = [];
        break;
    }
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


