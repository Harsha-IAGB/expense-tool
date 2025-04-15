import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      receipt: [null, Validators.required]
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.form.patchValue({ receipt: event.target.files[0] });
    }
  }

  submitForm() {
    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      formData.append(key, value as Blob);
    });

    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:8000/api/create-expense/', formData)
      .pipe(
        catchError((err) => {
          this.errorMessage = 'Failed to submit expense. Please try again.';
          console.error('Upload error', err);
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.successMessage = 'Expense submitted successfully!';
          alert(this.successMessage);
          this.form.reset();
          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
          }
        }
      });
  }
}