import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username!: string;
  password1!: string;
  password2!: string;

  constructor(private router: Router, private authService : AuthService){}

  registerUser(): void {
    this.authService.registerUser(
    {
      "id": 0,
      "name": this.username,
      "password": this.password1
    })
    .subscribe((data: any) =>
    {
      console.log(data)
    })
  }

  
}
