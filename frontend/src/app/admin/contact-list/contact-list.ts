import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactList implements OnInit {

  constructor(private api: Api) {}

  contacts = signal<any[]>([]);
  selectedContact = signal<any | null>(null);

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.api.getAllContacts().subscribe({
      next: (res: any) => {
        const data: any[] = Array.isArray(res) ? res : [];
        this.contacts.set(
          data.filter((c: any) => c.status === "Accepted")
        );
      },
      error: (err) => console.error(err),
    });
  }

  openModal(contact: any) {
    this.selectedContact.set(contact);
  }

  closeModal() {
    this.selectedContact.set(null);
  }

  deleteContact(id: string) {
    if (!confirm('Are you sure?')) return;

    this.api.deleteContact(id).subscribe(() => {
      this.loadContacts();
      this.closeModal();
    });
  }
}