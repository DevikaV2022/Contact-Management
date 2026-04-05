// connects with frontend and backend

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  server_url = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  // register
  registerAPI(reqBody: any) {

    // Sends data to backend
    return this.http.post(`${this.server_url}/api/auth/register`, reqBody)
  }

  // login
  loginAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/api/auth/login`, reqBody)
  }

  //Forgot Password
  forgotPasswordAPI(data: any) {
    return this.http.post(`${this.server_url}/api/auth/forgot-password`, data);
  }

  // Reset Password
  resetPasswordAPI(data: any) {
    return this.http.post(`${this.server_url}/api/auth/reset-password`, data);
  }


  // ==========================================  admin ========================================

  // CONTACT APIs

  //   addContactAPI(data: any) {
  //   return this.http.post("http://localhost:3000/api/contact/add-contact", data);
  // }

  getContactsAPI() {
    return this.http.get(`${this.server_url}/api/contact/admin/contacts`);
  }

  acceptContact(id: string) {
  return this.http.put(`http://localhost:3000/api/contact/update-status/${id}`, {});
}

  getAllContacts() {
    return this.http.get<any[]>("http://localhost:3000/api/contact/all-contacts");
  }


  getAcceptedContacts() {
    return this.http.get("http://localhost:3000/api/contact/accepted");
  }

  getPendingContacts() {
    return this.http.get("http://localhost:3000/api/contact/pending");
  }

  updateStatus(data: any) {
    return this.http.put("http://localhost:3000/api/contact/update-status", data);
  }

  deleteContact(id: string) {
    return this.http.delete(`http://localhost:3000/api/contact/delete/${id}`);
  }

  submitContact(data: any) {
    return this.http.post('http://localhost:3000/api/contact/add-contact', data);
  }


}
