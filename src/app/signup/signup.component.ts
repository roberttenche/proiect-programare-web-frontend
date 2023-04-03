import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: String;
  password1: String;
  password2: String;

  constructor(private router: Router)
  {
    this.username = '';
    this.password1 = '';
    this.password2 = '';
  }
  test(): void{
    console.log (this.username)
    console.log (this.password1)
    console.log (this.password2)
  }
}
