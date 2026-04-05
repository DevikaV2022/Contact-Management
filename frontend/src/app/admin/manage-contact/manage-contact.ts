import { Component, signal, NgZone } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-contact.html',
  styleUrl: './manage-contact.css',
})

export class ManageContact {

  constructor(private api: Api, private ngZone: NgZone) { }

  contacts = signal<any[]>([]);
  filteredContacts = signal<any[]>([]);

  selectedMessage = "";
  searchText: string = "";
  currentFilter: string = "All";

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.api.getAllContacts().subscribe({
      next: (res: any) => {

        this.ngZone.run(() => {

          const data: any[] = Array.isArray(res) ? res : [];

          this.contacts.set(data);
          this.filteredContacts.set(data);

        });

      },
      error: (err) => console.error(err),
    });
  }

  filterStatus(status: string) {
    this.currentFilter = status;
    this.applyFilter();
  }

  applyFilter() {

    let data = [...this.contacts()];

    if (this.currentFilter !== "All") {
      data = data.filter(c => c.status === this.currentFilter);
    }

    if (this.searchText) {
      data = data.filter(c =>
        c.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.filteredContacts.set(data);
  }

  accept(id: string) {
    this.api.updateStatus({
      id: id,
      status: "Accepted"
    }).subscribe(() => {
      this.loadContacts();
      this.applyFilter();
    });
  }

  reject(c: any) {
    this.api.updateStatus({
      id: c._id,
      status: "Rejected"
    }).subscribe(() => {
      this.loadContacts();
      this.applyFilter();
    });
  }

  delete(c: any) {
    this.api.deleteContact(c._id).subscribe(() => this.loadContacts());
  }

  view(c: any) {
    this.selectedMessage = c.message;
  }
}