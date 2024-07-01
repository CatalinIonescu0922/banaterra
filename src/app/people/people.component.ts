import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { MM_people } from '../models/people';
import { PeopleService } from '../people.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peoples: MM_people[] = [];
  displayedPeoples: MM_people[] = [];
  showAll: boolean = false;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.peopleService.getPeoples().subscribe(data => {
      this.peoples = data;
      this.displayedPeoples = this.peoples.slice(0, 10);
    });
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.displayedPeoples = this.showAll ? this.peoples : this.peoples.slice(0, 10);
  }
}
