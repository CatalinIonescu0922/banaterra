import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { MM_plants } from '../models/plants';
import { PlantsService } from '../plants.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {
  plants: MM_plants[] = [];
  displayedPlants: MM_plants[] = [];
  showAll: boolean = false;

  constructor(private plantsService: PlantsService) {}

  ngOnInit(): void {
    this.plantsService.getPlants().subscribe(data => {
      this.plants = data;
      this.displayedPlants = this.plants.slice(0, 10);
    });
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.displayedPlants = this.showAll ? this.plants : this.plants.slice(0, 10);
  }
}
