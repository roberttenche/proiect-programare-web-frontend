import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(private authService : AuthService, private router: Router,private cdr: ChangeDetectorRef) { }

  login() : void {
    if (this.CheckUsername(this.username) == false) {
      return;
    }
    this.authService.loginUser(
      {"username" : this.username, "password": this.password}
    )
    .subscribe((data: any) =>
    {
      this.authService.setToken(data["token"])
      this.authService.setUserId(data["userId"])
      this.cdr.detectChanges();
      this.router.navigateByUrl("home")
    })
  }

  CheckUsername(username: string) {
    if (this.username == null) alert("Username cannot be empty");
    if (false == this.AlphaNumberOnly(username)) {
      alert("Username can only contain letters and/or numbers");
      return false;
    }

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
