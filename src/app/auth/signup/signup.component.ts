import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);


  signupForm: FormGroup = new FormGroup({});
  isLoading:boolean = false;
  authMessage: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.isLoading = true;
      this.authMessage = null;

      this.authService.signup(name, email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.authMessage = response.message || 'Signup successful!';
        },
        error: (error) => {
          this.isLoading = false;
          this.authMessage = error.message;
        }
      });
    }
  }
}
