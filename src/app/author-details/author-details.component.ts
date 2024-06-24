import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthorsService } from '../authors.service';
import { Author } from '../models/author'; // Adjust the path as necessary
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-author-details',
    standalone: true,
    templateUrl: './author-details.component.html',
    styleUrls: ['./author-details.component.css'],
    imports: [CommonModule, NavBarComponent, FooterComponent]
})
export class AuthorDetailsComponent implements OnInit {
  authorId: string = '';  // Store authorId at the component level
  author!: Author;
  sanitizedDescription: SafeHtml | null = null;
  sanitizedQuotes: SafeHtml[] = [];
  quoteCounts: any[] = [];
  currentLanguageCode: string = 'ro'; // Default to English


  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authorId = params['authorId'];  // Capture and store authorId from route
      this.currentLanguageCode = params['languageId']; // Retrieve the language ID from the route
      this.fetchAuthorDetails(this.authorId, this.currentLanguageCode);
      this.fetchQuoteCounts(this.authorId);
    });
  }

  fetchAuthorDetails(authorId: string, languageId: string): void {
    this.currentLanguageCode = languageId;
    this.authorsService.getAuthorDetails(authorId, languageId).subscribe({
      next: (details) => {
        this.author = details;
        if (this.author?.des) {
          this.sanitizedDescription = this.sanitizeContent(this.author.des);
        }
        this.sanitizedQuotes = this.author?.quotes.map(quote => this.sanitizeContent(quote)) || [];
      },
      error: (error) => {
        console.error('Error fetching author details:', error);
      }
    });
  }

  fetchQuoteCounts(authorId: string): void {
    this.authorsService.getQuoteCountsByLanguage(authorId).subscribe({
      next: (counts) => {
        this.quoteCounts = counts;
      },
      error: (error) => {
        console.error('Error fetching quote counts:', error);
      }
    });
  }

  mapLanguageToCode(language: string): string {
    switch (language) {
      case 'English': return 'en';
      case 'Hungarian': return 'mag';
      case 'Romanian': return 'ro';
      default: return 'ro'; // default to English if unknown
    }
  }
  getQuotesHeading(): string {
    switch (this.currentLanguageCode) {
      case 'en': return 'Quotes';
      case 'ro': return 'Citate';
      case 'mag': return 'Idézetek'; // Add the Hungarian translation for "Quotes"
      default: return 'Quotes';
    }
  }

  sanitizeContent(content: string): SafeHtml {
    const cleanedContent = content.replace(/<\/?(p|strong|div|span)>/g, '');
    return this.sanitizer.bypassSecurityTrustHtml(cleanedContent);
  }

  

}


