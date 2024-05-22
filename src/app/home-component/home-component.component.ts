import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ContentComponent } from '../content/content.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NavBarComponent,ContentComponent,FooterComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
