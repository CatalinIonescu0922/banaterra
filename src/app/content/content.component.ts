import { Component, OnInit } from '@angular/core';
import { NascutAziService } from '../nascut-azi.service';
import { DecedatAziService } from '../decedat-azi.service';
import { DayService } from '../day.service';
import { MM_nascutAzi } from '../models/nascutAzi';
import { MM_decedatAzi } from '../models/decedatAzi';
import { MM_day } from '../models/day';
import { CommonModule } from '@angular/common';

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
  day: MM_day[] = [];
  img_w="250px";

  constructor(
    private nascut_aziService: NascutAziService,
    private decedat_aziService: DecedatAziService,
    private dayService: DayService
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

  }

}
