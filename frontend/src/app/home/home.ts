import { Component } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./home.css']
})
export class Home {
  formData = { name: '', email: '', phone: '', message: '' };
  emailSpaceError = false;
  username: string = '';

  constructor(private api: Api, private router: Router) { }

  validateEmail() {
    this.emailSpaceError = this.formData.email.startsWith(' ') || this.formData.email.endsWith(' ');
  }

  blockSpaces(event: KeyboardEvent) {
    if (event.key === ' ' || event.code === 'Space') event.preventDefault();
  }

  onSubmit() {
    this.api.submitContact(this.formData).subscribe({
      next: (res: any) => {
        alert("Submitted successfully");
        this.formData = { name: '', email: '', phone: '', message: '' };
      },
      error: (err: any) => {
        console.error(err);
        alert("Something went wrong");
      }
    });
  }


  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user?.name || 'User';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}