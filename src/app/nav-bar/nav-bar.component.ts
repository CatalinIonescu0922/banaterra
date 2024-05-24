import { Component } from '@angular/core';
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
  ChangeLanguage(lang: any) {
    const selectedLanguage = lang.target.value;
    
  }
}
