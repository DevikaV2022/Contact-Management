import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-reset-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-page.html',
  styleUrls: ['./reset-page.css'],
})
export class ResetPage {
  newPassword: string = "";
  token: string = "";

  constructor(private route: ActivatedRoute, private api: Api, private router: Router) {
    this.token = this.route.snapshot.params['token'];
  }

  reset() {
    this.api.resetPasswordAPI({ token: this.token, password: this.newPassword }).subscribe({
      next: (res) => {
        alert("Password Updated Successfully");
        this.router.navigate(['/login']); 
      },
      error: (err) => alert(err.error?.message || "Something went wrong"),
    });
  }
}