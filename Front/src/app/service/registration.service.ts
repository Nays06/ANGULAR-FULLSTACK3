

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  users: any = [];
  constructor(private http: HttpClient) {}
  
  registerUser(formData: FormData) {
    return this.http.post("http://localhost:5000/auth/registration", formData);
  }

  // getUsers() {
  //   const storedUsers = localStorage.getItem("users");
  //   if (storedUsers) {
  //     this.users = JSON.parse(storedUsers);
  //   } else {
  //     this.users = [];
  //   }
  //   return this.users;
  // }

  // addUser(newUser: any) {
  //   this.users.push(newUser);
  //   localStorage.setItem("users", JSON.stringify(this.users));
  // }
}
