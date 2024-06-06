import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-add-authors',
  standalone: true,
  imports: [NavBarComponent,FooterComponent],
  templateUrl: './add-authors.component.html',
  styleUrl: './add-authors.component.css'
})
export class AddAuthorsComponent {

}
