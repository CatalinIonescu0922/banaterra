import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthorsService } from '../authors.service';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../models/author';  // Adjust the path as necessary

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsComponent implements OnInit {
  author: Author | undefined;
  tagId!: string; 
  authors: Author[] = [];
  isViewAll: boolean = false;

  constructor(
    private authorsService: AuthorsService,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
  }

  toggleViewAll(): void {
    this.isViewAll = !this.isViewAll;
  }

  getAuthorInfo(): void {
    this.authorsService.getAuthorByTagId(this.tagId).subscribe((data) => {
      this.author = data;
    });
  }
}
