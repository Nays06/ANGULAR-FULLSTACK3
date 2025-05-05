import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  imports: [FormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
  userName: string = ""
  userPassword: string = ""
  errorPassword: string = ""
  errorValid: string = ""
  error: string = ""

  constructor(private authorization: LoginService, private route: Router) {}

  login(){
    debugger
    this.errorValid = "";
    this.errorPassword = "";
    this.error = "";

    if (
      !this.userName ||
      !this.userPassword
    ) {
      this.errorValid = "Пожалуйста, заполните все поля корректно";
      return;
    }
    if (this.userPassword.length < 6) {
      this.errorPassword = "Пароль должен быть не менее 6 символов";
      return;
    }

    this.authorization.onLogin({ username: this.userName, password: this.userPassword }).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem("token", res.token)
        this.route.navigateByUrl("/profile")
      },
      error: (e) => {
        this.error = e.error?.message || "Ошибка регистрации";
        console.error("HTTP error:", e);
      }
    })
  }
}
