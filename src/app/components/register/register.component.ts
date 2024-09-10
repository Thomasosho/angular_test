import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  template: `
    <div class="max-w-md mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label for="name" class="block mb-1">Name</label>
          <input type="text" id="name" formControlName="name" class="w-full p-2 border rounded">
        </div>
        <div>
          <label for="email" class="block mb-1">Email</label>
          <input type="email" id="email" formControlName="email" class="w-full p-2 border rounded">
        </div>
        <div>
          <label for="password" class="block mb-1">Password</label>
          <input type="password" id="password" formControlName="password" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.get('name')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value
      ).subscribe(
        () => this.router.navigate(['/projects']),
        error => console.error('Registration failed', error)
      );
    }
  }
}