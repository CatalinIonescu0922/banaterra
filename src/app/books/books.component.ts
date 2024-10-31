import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Language } from '../models/language';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  imports: [NavBarComponent, FooterComponent, CommonModule],
  standalone : true, 
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  languages: Language[] = [];
  books: Book[] = [];
  selectedLanguageId: number | null = null;
  isOriginalSelected: boolean = true; // Tracks whether Original or Translations is selected

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getLanguages().subscribe({
      next: (data) => {
        this.languages = data;
      },
      error: (err) => console.error('Error fetching languages:', err)
    });
  }

  selectLanguage(languageId: number): void {
    this.selectedLanguageId = languageId;
    this.showOriginalBooks(); // Default to showing original books when a language is selected
  }

  getSelectedLanguageName(): string | undefined {
    const selectedLanguage = this.languages.find(lang => lang.id === this.selectedLanguageId);
    return selectedLanguage ? selectedLanguage.name : undefined;
  }

  // Show original books in the selected language
  showOriginalBooks(): void {
    this.isOriginalSelected = true;
    if (this.selectedLanguageId) {
      this.bookService.getOriginalBooksByLanguage(this.selectedLanguageId).subscribe({
        next: (data) => {
          this.books = data;
          this.books.forEach(book => {
             console.log(book.book_name);
          });
        },
        error: (err) => console.error('Error fetching original books:', err)
      });
    }
  }

  // Show translated books in the selected language
  showTranslatedBooks(): void {
    this.isOriginalSelected = false;
    if (this.selectedLanguageId) {
      this.bookService.getTranslatedBooksByLanguage(this.selectedLanguageId).subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (err) => console.error('Error fetching translated books:', err)
      });
    }
  }

  // Navigate to book details page
  viewBookDetails(bookId: string): void {
    this.router.navigate(['/books', bookId]);
  }
}
