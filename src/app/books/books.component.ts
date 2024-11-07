import { Component, OnInit } from '@angular/core';
import { BookService } from '../books.service';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Language } from '../models/language';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx'
import { HttpClient } from '@angular/common/http';
import { ExtractedDataOrg } from '../models/extractedData_Org';
import { ExtractedDataTrans } from '../models/extractedData_Trans';
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
  isOriginalSelected: boolean = true;
  fileData: any = null; // Holds the parsed Excel data
  extractedData_Org: ExtractedDataOrg[] = [];
  extractedData_Trans: ExtractedDataTrans[] = []; // Tracks whether Original or Translations is selected
  constructor(private bookService: BookService, private router: Router, private http : HttpClient) {}

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
    const book = this.books.find(b => b.id=bookId);
    if(book)
      this.router.navigate(['/books/details', bookId], {state : {name : book.book_name, author : book.book_author}});
    
  }
  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      alert('Please select a single file');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const arrayBuffer: ArrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const binaryStr = Array.from(data).map(byte => String.fromCharCode(byte)).join('');
      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });

      workbook.SheetNames.forEach((sheetName, index) => {
        const worksheet = workbook.Sheets[sheetName];
        const code = sheetName.slice(0, 2).toLowerCase();

        // Process the first sheet with the `author_name` structure
        if (index === 0) {
          const firstSheetData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
          const headerRow = firstSheetData[0];
          
          const processedData = firstSheetData.slice(1).map(row => ({
            code,
            book_name: row[headerRow.indexOf('book_name')],
            author_name: row[headerRow.indexOf('author_name')],
            chapter: Number(row[headerRow.indexOf('chapter')]),
            quote: row[headerRow.indexOf('quote')],
            link_carte: row[headerRow.indexOf('link_carte')],
            poza: row[headerRow.indexOf('poza')]
          }));

          this.extractedData_Org.push(...processedData);
        } 
        // Process remaining sheets with the `translator_name` structure
        else {
          const sheetData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
          const headerRow = sheetData[0];

          const processedData = sheetData.slice(1).map(row => ({
            code,
            book_name: row[headerRow.indexOf('book_name')],
            translator_name: row[headerRow.indexOf('translator_name')],
            chapter: Number(row[headerRow.indexOf('chapter')]),
            quote: row[headerRow.indexOf('quote')],
            link_carte: row[headerRow.indexOf('link_carte')],
            poza: row[headerRow.indexOf('poza')]
          }));

          this.extractedData_Trans.push(...processedData);
        }
      });

      // Store the combined data to be sent on button click
      this.fileData = { extractedData_Org: this.extractedData_Org, extractedData_Trans: this.extractedData_Trans };
    };

    reader.readAsArrayBuffer(target.files[0]);
  }

  sendDataToBackend() {

    if (this.fileData) {
      console.log(this.fileData);
      this.http.post('http://localhost:8000/add-excel/books', this.fileData).subscribe(
        response => {
          console.log('Data sent successfully:', response);
        },
        error => {
          console.error('Error sending data:', error);
        }
      );
    } else {
      console.error("No data to send.");
    }
  }  
}
