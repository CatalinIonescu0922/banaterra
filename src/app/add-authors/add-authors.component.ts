import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-authors',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-authors.component.html',
  styleUrls: ['./add-authors.component.css']
})
export class AddAuthorsComponent {
  authorForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      deathDate: [''],
      //nationality: ['', Validators.required],
      description: [''],
      image: [null]
    });
  }

  onSubmit() {
    if (this.authorForm.valid) {
      const formData = new FormData();
      for (const key in this.authorForm.value) {
        if (this.authorForm.value.hasOwnProperty(key)) {
          let newKey = key;
          if (key === 'birthDate') newKey = 'b_date';
          if (key === 'deathDate') newKey = 'd_date';
          if (key === 'description') newKey = 'des';
          formData.append(newKey, this.authorForm.value[key]);
        }
      }
  
      console.log('Submitting form data:', formData);
  
      this.http.post('http://localhost:8000/add-authors', formData)
        .subscribe(response => {
          console.log('Author successfully added TS', response);
          this.router.navigate(['/authors']); // Navigate to the authors list or another desired route
        }, error => {
          console.error('Error adding author ts', error);
        });
    }
  }
  

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.authorForm.patchValue({
        image: file
      });
      this.authorForm.get('image')?.updateValueAndValidity();
    }
  }
}