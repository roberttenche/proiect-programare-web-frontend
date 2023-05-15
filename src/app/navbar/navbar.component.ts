import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  items!: MenuItem[];

  constructor(private authService : AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: ['/login']
      }
    ];
    if (this.authService.getToken() !== null) {
      this.items.push({
        label: 'My Chats',
        icon: 'pi pi-comment',
        routerLink: ['/chat']
      })
    }

    this.items.push({
      label: 'About',
      icon: 'pi pi-info-circle',
      routerLink: ['/about']
    })
  }

}
