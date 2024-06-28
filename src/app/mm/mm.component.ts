import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { MM_country } from '../models/mm';
import { CountryService } from '../mm.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mm',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './mm.component.html',
  styleUrls: ['./mm.component.css']
})
export class MMComponent implements OnInit {
  countries: MM_country[] = [];
  displayedCountries: MM_country[] = [];
  showAll: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
      this.displayedCountries = this.countries.slice(0, 10);
    });
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.displayedCountries = this.showAll ? this.countries : this.countries.slice(0, 10);
  }
}
