import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onLogin(obj: any){
    return this.http.post("http://localhost:5000/auth/login", obj)
  }

  getProfile() {
    return this.http.get("http://localhost:5000/auth/profile")
  }
}
