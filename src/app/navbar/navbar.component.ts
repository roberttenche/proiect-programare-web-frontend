import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  items!: MenuItem[];

  constructor(private authService : AuthService, private userService : UserService) {}

  async ngOnInit(): Promise<void> {
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
    this.items.push({
      label: 'Chats',
      icon: 'pi pi-comment',
      routerLink: ['/chat']
    })


    this.items.push({
      label: 'Appointments',
      icon: 'pi pi-calendar',

      items: [
        {
          label: 'My appointments',
          icon: 'pi pi-fw pi-book',
          routerLink: ['/appointments']
        },
        {
          label: 'Add appointment',
          icon: 'pi pi-fw pi-calendar-plus',
          routerLink: ['/appointments/add']
        }
      ]
    })


    
  }

}
