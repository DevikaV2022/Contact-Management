import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  registerForm: FormGroup

  showPassword: boolean = false;
  successMessage: string = "";
  apiError: string = "";


  constructor(private fb: FormBuilder, private api: Api, private router: Router) {
    this.registerForm = fb.group({
      username: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ["", [Validators.required, Validators.email, Validators.pattern(/^\S(.*\S)?$/)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.pattern(/^\S(.*\S)?$/)]],
      role: ["user"]
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
    }
  }

  // register function
  register() {
    if (this.registerForm.valid) {
      this.apiError = "";
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const role = this.registerForm.value.role


      this.api.registerAPI({ username, email, password, role }).subscribe({
        next: (res: any) => {
          this.successMessage = `Welcome ${res.username}, Please Login`;
          this.registerForm.reset();

          setTimeout(() => {
            this.successMessage = "";
            this.router.navigateByUrl("/login");
          }, 2000);
        },
        error: (reason: any) => {
          this.apiError = reason.error?.message || "Something went wrong";
          this.registerForm.reset()
        }
      })
    }
    else {
      alert("Invalid Form")
    }


  }
}