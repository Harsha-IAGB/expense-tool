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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      receipt: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.form.patchValue({ receipt: event.target.files[0] });
    }
  }

  get tooltipMessage(): string {
    let message = '';
    if (this.form.controls['date'].invalid) {
      message += 'Date is required.\n';
    }
    if (this.form.controls['amount'].invalid) {
      message += 'Amount is required and must be greater than 0.\n';
    }
    if (this.form.controls['description'].invalid) {
      message += 'Description is required.\n';
    }
    if (this.form.controls['receipt'].invalid) {
      message += 'Receipt file is required.\n';
    }
    return message.trim();
  }

  submitForm() {
    if (this.form.invalid) {
      alert(this.tooltipMessage);
      return;
    }

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
          let alertMessage = '';
          if (err.error.amount) {
            alertMessage += err.error.amount + "\n";
          }
          if (err.error.date) {
            alertMessage += err.error.date + "\n";
          }
          if (err.error.description) {
            alertMessage += "Description: " + err.error.description + "\n";
          }
          if (err.error.receipt) {
            alertMessage += err.error.receipt + "\n";
          }
          alert(alertMessage);
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