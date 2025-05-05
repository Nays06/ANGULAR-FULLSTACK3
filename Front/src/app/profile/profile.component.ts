import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = {}


  constructor(private authorization: LoginService) {}

  ngOnInit() {
    this.authorization.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
        console.log(this.user);
        
      },
      error: (error: any) => {
        console.error('Error fetching profile:', error);
      }
    });
  }
}
