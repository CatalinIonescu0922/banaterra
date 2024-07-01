import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { MM_bible } from '../models/bible';
import { BibleService } from '../bible.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bible',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.css']
})
export class BibleComponent implements OnInit {
  bible: MM_bible[] = [];
  displayedBible: MM_bible[] = [];
  showAll: boolean = false;

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.bibleService.getBible().subscribe(data => {
      this.bible = data;
      this.displayedBible = this.bible.slice(0, 10);
    });
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.displayedBible = this.showAll ? this.bible : this.bible.slice(0, 10);
  }
}
