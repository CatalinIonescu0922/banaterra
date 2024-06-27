import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-authors',
  standalone: true,
  imports: [NavBarComponent,FooterComponent,CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-authors.component.html',
  styleUrl: './add-authors.component.css'
})
export class AddAuthorsComponent {
  authorForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.authorForm = this.fb.group({
      //type: ['author', Validators.required],
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      deathDate: [''],
      nationality: ['', Validators.required],
      description: [''],
      image: [null]
    });
  }

  onSubmit() {
    if (this.authorForm.valid) {
      const formData = new FormData();
      for (const key in this.authorForm.value) {
        if (this.authorForm.value.hasOwnProperty(key)) {
          formData.append(key, this.authorForm.value[key]);
        }
      }

      this.http.post('http://localhost:3000/api/authors', formData)
        .subscribe(response => {
          console.log('Author successfully added', response);
        }, error => {
          console.error('Error adding author', error);
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
