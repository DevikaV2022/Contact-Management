import { Component, OnInit, signal, NgZone } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {

  contacts = signal<any[]>([]);

  acceptedCount = 0;
  newRequests = 0;

  constructor(private api: Api, private ngZone: NgZone) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getAllContacts().subscribe((res: any) => {

      this.ngZone.run(() => {

        const data: any[] = Array.isArray(res) ? res : [];

        this.contacts.set(data);

        this.acceptedCount = data.filter(c => c.status === "Accepted").length;
        this.newRequests = data.filter(c => c.status === "New").length;

      });

    });
  }

  updateStatus(contact: any, status: string) {
    contact.status = status;
    contact.updatedAt = new Date();

    this.api.updateStatus({
      id: contact._id,
      status: contact.status
    }).subscribe(() => this.loadData());
  }

  accept(contact: any) {
    this.api.updateStatus({
      id: contact._id,
      status: "Accepted"
    }).subscribe(() => this.loadData());
  }

  reject(contact: any) {
    this.api.updateStatus({
      id: contact._id,
      status: "Rejected"
    }).subscribe(() => this.loadData());
  }
}