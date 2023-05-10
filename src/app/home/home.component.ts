import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Surgeon } from '../models/surgeon.model';
import { SurgeonService } from '../services/surgeon.service';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  surgeonList!: Observable<Surgeon[]>;

  constructor(private router: Router, private authService : AuthService, private surgeonService : SurgeonService, private chatService : ChatService){}

  ngOnInit(): void
  {
    this.surgeonList = this.surgeonService.getSurgeons()
  }

  sendMessageRedirect(surgeonId: number): void {

    this.router.navigate(['/chat'], {queryParams: { surgeonId: surgeonId}})

  }

}
