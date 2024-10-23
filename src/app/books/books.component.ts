import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { Book } from '../models/book'; // Adjust the path as necessary
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  pageSize = 8; // Number of books displayed per page
  currentPage = 1;
  isViewAll: boolean = false;
  selectedBook: Book | null = null;
  showDetails = false;
  selectedLanguageId = 77;  // default language
  img_w="250px";


  constructor(private booksService: BooksService, private router: Router,private languageService: LanguageService) {}
 

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  toggleViewAll(): void {
    this.isViewAll = !this.isViewAll;
    // Reset current page to 1 when switching to View Less
    this.currentPage = 1;
  }

  getDisplayedBooks(): Book[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    let slicedBooks = this.books.slice(startIndex, endIndex);
    return slicedBooks;
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.books.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.books.length / this.pageSize);
  }

  setPage(pageNumber: number) {
    this.currentPage = Math.min(Math.max(pageNumber, 1), this.getTotalPages()); // Ensures page number is within valid range
  }



  
  goBackToList(): void {
    this.showDetails = false; // Hide the details and show the list again
    this.selectedBook = null;
  }

  clearSelection(): void {
    this.selectedBook = null; // Clear the current selection
  }

  getPreviousPages(): number[] {
    const totalPages = this.getTotalPages();
    const previousPages = Math.min(4, this.currentPage - 1); // Show at most 4 previous pages

    // Logic to determine previous pages based on current page
    let startPage = Math.max(1, this.currentPage - previousPages);

    return Array.from({ length: previousPages }, (_, i) => startPage + i);
  }

  getNextPages(): number[] {
    const totalPages = this.getTotalPages();
    const nextPages = Math.min(2, totalPages - this.currentPage); // Show at most 2 pages after current

    // Logic to determine next pages based on current page and total pages
    let startPage = Math.min(this.currentPage + 1, totalPages - nextPages + 1);

    return Array.from({ length: nextPages }, (_, i) => startPage + i);
  }

  setLastPage(): void {
    this.currentPage = this.getTotalPages();
  }

  setPreviousPage(): void {
    this.setPage(Math.max(this.currentPage - 1, 1)); // Ensures page number doesn't go below 1
  }

  setNextPage(): void {
    this.setPage(Math.min(this.currentPage + 1, this.getTotalPages())); // Ensures page number doesn't go above total pages
  }

  getVisiblePages(): number[] {
    const totalPages = this.getTotalPages();
    const visiblePages = Math.min(totalPages, 5); // Assuming you want 5 visible pages

    // Logic to determine visible pages based on current page and total pages
    let startPage = Math.max(
      1,
      Math.min(this.currentPage, totalPages - visiblePages + 1)
    );
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Create an array of page numbers for visible pages
    return Array.from({ length: visiblePages }, (_, i) => startPage + i);
  }

  setFirstPage(): void {
    this.setPage(1); // Directly set current page to 1
  }
}
