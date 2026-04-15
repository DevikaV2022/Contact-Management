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

  constructor(private fb: FormBuilder, private api: Api, private router: Router) {
    this.registerForm = fb.group({
      username: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ["", [Validators.required, Validators.email, Validators.pattern(/^\S(.*\S)?$/)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.pattern(/^\S(.*\S)?$/)]]
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
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      console.log(username, email, password);

      this.api.registerAPI({ username, email, password }).subscribe({
        next: (res: any) => {
          alert(`Welcome...${res.username}, Please Login`)
          this.router.navigateByUrl("/login")
          this.registerForm.reset()
        },
        error: (reason: any) => {
          alert(reason.error?.message || "Something went wrong")
          this.registerForm.reset()
        }
      })
    }
    else {
      alert("Invalid Form")
    }


  }
}