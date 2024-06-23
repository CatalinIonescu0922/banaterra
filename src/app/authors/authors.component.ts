import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthorsService } from '../authors.service';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../models/author'; // Adjust the path as necessary

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  pageSize = 8; // Number of authors displayed per page
  currentPage = 1;
  isViewAll: boolean = false;
  selectedAuthor: Author | null = null;
  showDetails = false;

  constructor(
    private cd: ChangeDetectorRef,
    private authorsService: AuthorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
  }

  updateView() {
    this.cd.detectChanges(); // Manually trigger change detection
  }

  toggleViewAll(): void {
    this.isViewAll = !this.isViewAll;
    // Reset current page to 1 when switching to View Less
    this.currentPage = 1;
  }

  getDisplayedAuthors(): Author[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.authors.slice(startIndex, endIndex);
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.authors.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.authors.length / this.pageSize);
  }

  setPage(pageNumber: number) {
    this.currentPage = Math.min(Math.max(pageNumber, 1), this.getTotalPages()); // Ensures page number is within valid range
  }

  // In authors.component.ts
  selectAuthor(authorId: number): void {
    console.log("Clicked author ID:", authorId);
    this.authorsService.getAuthorDetails(authorId.toString()).subscribe({
      next: (details) => {
        console.log("Details fetched", details);
        this.selectedAuthor = details;
        this.showDetails = true;
      },
      error: (error) => {
        console.error("Error fetching author details:", error);
      }
    });
  }
  
  
  log(message: string, data: any): void {
    console.log(message, data);
    this.cd.detectChanges();
  }
  
  goBackToList(): void {
    this.showDetails = false;  // Hide the details and show the list again
    this.selectedAuthor = null;
  }
  // In authors.component.ts

clearSelection(): void {
  this.selectedAuthor = null;  // Clear the current selection
}

  // New methods for previous and next pages

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

  // Fix for ">>" button to always navigate to last page
  setLastPage(): void {
    this.currentPage = this.getTotalPages();
  }

  // Function for "<" button (decrease current page)
  setPreviousPage(): void {
    this.setPage(Math.max(this.currentPage - 1, 1)); // Ensures page number doesn't go below 1
  }

  // Function for ">" button (increase current page)
  setNextPage(): void {
    this.setPage(Math.min(this.currentPage + 1, this.getTotalPages())); // Ensures page number doesn't go above total pages
  }

  getVisiblePages(): number[] {
    const totalPages = this.getTotalPages();
    const visiblePages = Math.min(totalPages, 5); // Assuming you want 5 visible pages
  
    // Logic to determine visible pages based on current page and total pages
    let startPage = Math.max(1, Math.min(this.currentPage, totalPages - visiblePages + 1));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
  
    // Create an array of page numbers for visible pages
    return Array.from({ length: visiblePages }, (_, i) => startPage + i);
  }

  // Function for "<" button (decrease current page)
  // Existing function in authors.component.ts

// Function for "<" button (decrease current page)

// New function for "<<" button
setFirstPage(): void {
  this.setPage(1); // Directly set current page to 1
}

}  