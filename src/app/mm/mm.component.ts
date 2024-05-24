import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LifeExpectancyComponent } from '../life-expectancy/life-expectancy.component';

@Component({
  selector: 'app-mm',
  standalone: true,
  imports: [NavBarComponent,LifeExpectancyComponent],
  templateUrl: './mm.component.html',
  styleUrl: './mm.component.css'
})
export class MMComponent {

}
