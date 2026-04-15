import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  loginForm: FormGroup;
  errorMessage: string = "";
  showRegisterBtn: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize reactive form
    this.loginForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email.trim();
      const password = this.loginForm.value.password.trim();

      this.api.loginAPI({ email, password }).subscribe({
        next: (res: any) => {
          console.log("LOGIN RESPONSE:", res);
          console.log("ROLE:", res.user.role);
          // store token & user
          this.authService.login(res.token, res.user);
          this.errorMessage = "";
          this.showRegisterBtn = false;
          this.loginForm.reset();

          // role-based redirect
          if (res.user.role?.toLowerCase() === 'admin') {
            this.router.navigateByUrl("/admin/dashboard");
          } else {
            this.router.navigateByUrl("/home");
          }
        },
        error: (reason: any) => {
          const msg = reason.error?.message || "User not found";
          this.errorMessage = msg;
          this.showRegisterBtn = msg.toLowerCase().includes("register");
          this.loginForm.reset();
        }
      });
    } else {
      this.errorMessage = "Invalid Form";
    }
  }
}