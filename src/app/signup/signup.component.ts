import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  firstName!: string;
  lastName!: string;

  username!: string;
  email! : string;

  password1!: string;
  password2!: string;

  constructor(private router: Router, private authService : AuthService){}

  registerUser(): void {
    this.authService.registerUser(
    {
      "id": 0,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "imageUrl": "",
      "role": "USER"
    },
    {
      "username": this.username,
      "password": this.password1
    })
    .subscribe((data: any) =>
    {
      this.authService.setToken(data["token"])
      this.authService.setUserId(data["userId"])
      this.router.navigateByUrl("home")
    })

  }
}
