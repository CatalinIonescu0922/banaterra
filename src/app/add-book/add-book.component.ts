import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.bookForm = this.fb.group({
      bookName: ['', Validators.required]
      
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();
      for (const key in this.bookForm.value) {
        if (this.bookForm.value.hasOwnProperty(key)) {
          let newKey = key;
          if (key === 'bookName') newKey = 'book_name';
          formData.append(newKey, this.bookForm.value[key]);
        }
      }
  
      console.log('Submitting form data:', formData);
  
      this.http.post('http://localhost:8000/add-book', formData)
        .subscribe(response => {
          console.log('Book successfully added TS', response);
          this.router.navigate(['/books']); // Navigate to the authors list or another desired route
        }, error => {
          console.error('Error adding book ts', error);
        });
    }
  }
  
}