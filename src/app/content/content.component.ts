import { Component, OnInit } from '@angular/core';
import { NascutAziService } from '../nascut-azi.service';
import { DecedatAziService } from '../decedat-azi.service';
import { MM_nascutAzi } from '../models/nascutAzi';
import { MM_decedatAzi } from '../models/decedatAzi';
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
  img_w="250px";

  constructor(
    private nascut_aziService: NascutAziService,
    private decedat_aziService: DecedatAziService
  ) { }

  ngOnInit(): void {
    this.nascut_aziService.getNascutAzi().subscribe(data => {
      this.nascut_azi = data;
    });

    this.decedat_aziService.getDecedatAzi().subscribe(data => {
      this.decedat_azi = data;
    });

  }

}
