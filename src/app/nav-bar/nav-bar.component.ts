import { Component } from '@angular/core';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';
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
  constructor(private languageService: LanguageService , private router : Router) { }

  ChangeLanguage(event: any) {
    this.languageService.changeLanguage(event.target.value);
  }
  changeToLogin() :void {
      this.router.navigate(["/login"]); 
  }
}
