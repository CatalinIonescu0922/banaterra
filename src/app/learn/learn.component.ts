import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Make sure this import is added
import { CommonModule } from '@angular/common'; // Import CommonModule

// Define the Quote interface here
interface Quote {
  original: string;
  translation: string;
}

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [NavBarComponent,FooterComponent, FormsModule, CommonModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent implements OnInit {
  selectedLanguageId: number = 1;
  selectedLanguageId2: number = 1; // For the second select, defaulting to 1 as well
  quotes: Quote[] = [];
  languages = [
    { id: 1, name: 'Chinese', code: 'zh' },
    { id: 2, name: 'Bulgarian', code: 'bg' },
    { id: 3, name: 'Czech', code: 'cs' },
    { id: 4, name: 'Danish', code: 'da' },
    { id: 5, name: 'Spanish', code: 'es' },
    { id: 6, name: 'Estonian', code: 'et' },
    { id: 7, name: 'Finnish', code: 'fi' },
    { id: 8, name: 'French', code: 'fr' },
    { id: 9, name: 'Greek', code: 'gr' },
    { id: 10, name: 'German', code: 'de' },
    { id: 11, name: 'Italian', code: 'it' },
    { id: 12, name: 'Japanese', code: 'ja' },
    { id: 13, name: 'Dutch', code: 'nl' },
    { id: 14, name: 'Polish', code: 'pl' },
    { id: 15, name: 'Romanian', code: 'ro' },
    { id: 16, name: 'Russian', code: 'ru' },
    { id: 17, name: 'Swedish', code: 'sv' },
    { id: 18, name: 'Ukrainian', code: 'uk' },
    { id: 19, name: 'Persian', code: 'fa' },
    { id: 20, name: 'Korean', code: 'ko' },
    { id: 23, name: 'English', code: 'en' },
    { id: 40, name: 'Hungarian', code: 'hu' },
    { id: 77, name: 'Romanian', code: 'ro' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Optionally, fetch initial data or set defaults
  }

  fetchQuotes(): void {
    this.http.get<any[]>(`http://localhost:8000/learn/${this.selectedLanguageId}/${this.selectedLanguageId2}`).subscribe(
      data => {
        this.quotes = data;  // data should now include both original and translation
      },
      error => {
        console.error('Failed to fetch quotes', error);
      }
    );
  }
}