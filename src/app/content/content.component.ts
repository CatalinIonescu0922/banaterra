import { Component, OnInit } from '@angular/core';
import { NascutAziService } from '../nascut-azi.service';
import { DecedatAziService } from '../decedat-azi.service';
import { CompaniiService } from '../companii.service';
import { DayService } from '../day.service';
import { MM_nascutAzi } from '../models/nascutAzi';
import { MM_decedatAzi } from '../models/decedatAzi';
import { MM_day } from '../models/day';
import { CommonModule } from '@angular/common';
import { MM_sponsors } from '../models/sponsors';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  nascut_azi: MM_nascutAzi[] = [];
  decedat_azi: MM_decedatAzi[] = [];
  sponsors: MM_sponsors[] = [];
  day: MM_day[] = [];
  img_w="250px";
  currentSlide = 0;

  constructor(
    private nascut_aziService: NascutAziService,
    private decedat_aziService: DecedatAziService,
    private dayService: DayService,
    private companiiService: CompaniiService
  ) { }

  ngOnInit(): void {
    this.nascut_aziService.getNascutAzi().subscribe(data => {
      this.nascut_azi = data;
    });

    this.decedat_aziService.getDecedatAzi().subscribe(data => {
      this.decedat_azi = data;
    });

    this.dayService.getDay().subscribe(data => {
      this.day = data;
    });

    this.companiiService.getSponsors().subscribe(data => {
      this.sponsors = data;
    })

  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
    this.updateSlidePosition();
  }

  nextSlide() {
    if (this.currentSlide < this.sponsors.length - 1) {
      this.currentSlide++;
    }
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const slideWidth = carousel.offsetWidth / 3;  // assuming 3 items per view
    carousel.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
  }
}


