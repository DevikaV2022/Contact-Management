import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})

export class Sidebar {

  loading: boolean = false;

  showLogoutModal: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }
  
  confirmLogout() {
    this.showLogoutModal = false;

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

}


