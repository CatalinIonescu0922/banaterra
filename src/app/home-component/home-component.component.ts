import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
