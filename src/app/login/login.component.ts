import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(private authService : AuthService) { }

  login() : void {
    
  }

  CheckUsername(username: string) {
    if (this.username == null) alert("Username cannot be empty");
    if (false == this.AlphaNumberOnly(username)) alert("Username can only contain letters and/or numbers");

    return true

  }

  AlphaNumberOnly(username: string) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    if (regex.test(username)) {
        return true;
    }
    return false;
}

}
