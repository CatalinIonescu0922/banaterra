import { Component } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  logoPath = '../assets/img/logo.png';
  userPhoto = '../assets/img/nouser.jpeg';
  constructor(private languageService: LanguageService) { }

  ChangeLanguage(event: any) {
    this.languageService.changeLanguage(event.target.value);
  }
}
