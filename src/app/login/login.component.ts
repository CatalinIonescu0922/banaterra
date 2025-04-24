import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { Router }       from '@angular/router';
import { NavBarComponent }   from '../nav-bar/nav-bar.component';
import { FooterComponent }   from '../footer/footer.component';
import { LoginService }      from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,   // pentru *ngIf
    FormsModule,    // pentru ngModel
    NavBarComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';
    this.loginService.login(this.email, this.password)
      .subscribe({
        next: () => {
          // La succes, merge la pagina principală (asegură-te că ruta '' e HomeComponent)
          this.router.navigate(['/']);
        },
        error: err => {
          // Preia mesajul trimis din backend (e.g. "User not found" sau "Invalid password")
          this.errorMessage = err.error?.message || 'Login failed';
        }
      });
  }

  changeToCreate_Account(): void {
    this.router.navigate(['/login/createAccount']);
  }
}
