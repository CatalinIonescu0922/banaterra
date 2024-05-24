import { Component, OnInit } from '@angular/core';

import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LifeExpectancyComponent } from '../life-expectancy/life-expectancy.component';
import { BiblicalLongevivsComponent } from '../biblical-longevivs/biblical-longevivs.component';
import { PlantsComponent } from '../plants/plants.component';
import { AnimalsComponent } from '../animals/animals.component';
import { TimeSpentComponent } from '../time-spent/time-spent.component';
import { EtaCalculatorComponent } from '../eta-calculator/eta-calculator.component';

@Component({
  selector: 'app-mm',
  standalone: true,
  imports: [NavBarComponent,LifeExpectancyComponent,BiblicalLongevivsComponent,PlantsComponent,AnimalsComponent,TimeSpentComponent,EtaCalculatorComponent],
  templateUrl: './mm.component.html',
  styleUrl: './mm.component.css'
})
export class MMComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }
}