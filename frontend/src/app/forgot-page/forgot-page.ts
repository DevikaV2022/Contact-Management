import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-page.html',
  styleUrls: ['./forgot-page.css'],
})
export class ForgotPage {

  email: string = "";

  constructor(private api: Api, private router: Router) {}
  
sendLink() {
  if (!this.email) {                       // <-- check for empty email
    alert('Please enter your email');
    return;
  }

  this.api.forgotPasswordAPI({ email: this.email }).subscribe({
    next: (res: any) => {
      alert(res.message || 'Reset link sent successfully!');
      this.router.navigate(['/login']);   // <-- redirect to login after success
    },
    error: (err) => alert(err.error?.message || "Something went wrong")
  });
}

}