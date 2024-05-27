import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthorsService } from '../authors.service';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'], // Fixed the typo from styleUrl to styleUrls
})
export class AuthorsComponent implements OnInit {
  author: any;
  tagId!: string; // Using the non-null assertion operator

  constructor(
    private authorsService: AuthorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tagId = params.get('tag_id');
      if (tagId) {
        this.tagId = tagId;
        this.getAuthorInfo();
      }
    });
  }

  getAuthorInfo(): void {
    this.authorsService.getAuthorByTagId(this.tagId).subscribe((data) => {
      this.author = data;
    });
  }
}
