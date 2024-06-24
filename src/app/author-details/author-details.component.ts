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
  author!: Author ;
  sanitizedDescription: SafeHtml | null = null;

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const authorId = params['authorId'];
      const languageId = params['languageId']; // Retrieve the language ID from the route
      this.fetchAuthorDetails(authorId, languageId);
    });
  }

  fetchAuthorDetails(authorId: string, languageId: string): void {
    this.authorsService.getAuthorDetails(authorId, languageId).subscribe({
      next: (details) => {
        this.author = details;
        if (this.author?.des) {
          this.sanitizedDescription = this.sanitizeDescription(this.author.des);
        }
      },
      error: (error) => {
        console.error('Error fetching author details:', error);
      }
    });
  }


  sanitizeDescription(description: string): SafeHtml {
    // Remove specific tags like <p> and <strong>
    const cleanedDescription = description.replace(/<\/?(p|strong)>/g, '');
    return this.sanitizer.bypassSecurityTrustHtml(cleanedDescription);
  }
}
