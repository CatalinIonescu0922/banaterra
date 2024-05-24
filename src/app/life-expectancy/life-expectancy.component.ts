import { Component} from '@angular/core';

import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-life-expectancy',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './life-expectancy.component.html',
  styleUrl: './life-expectancy.component.css'
})
export class LifeExpectancyComponent{

}
