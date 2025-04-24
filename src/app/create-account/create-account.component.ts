import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CreateAccountService } from '../create-account.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavBarComponent,
    FooterComponent,
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  email = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  errorMessage = '';

  constructor(
    private accountService: CreateAccountService,
    public router: Router
  ) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Parolele nu coincid.';
      return;
    }

    this.accountService
      .createAccount(this.email, this.password, this.firstName, this.lastName)
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => {
          this.errorMessage = err.error?.message || 'Eroare la înregistrare.';
          console.error('Registration error', err);
        }
      });
  }
}
