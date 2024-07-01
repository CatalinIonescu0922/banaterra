import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { MM_animals } from '../models/animals';
import { AnimalsService } from '../animals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals: MM_animals[] = [];
  displayedAnimals: MM_animals[] = [];
  showAll: boolean = false;

  constructor(private animalsService: AnimalsService) {}

  ngOnInit(): void {
    this.animalsService.getAnimals().subscribe(data => {
      this.animals = data;
      this.displayedAnimals = this.animals.slice(0, 10);
    });
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.displayedAnimals = this.showAll ? this.animals : this.animals.slice(0, 10);
  }
}
