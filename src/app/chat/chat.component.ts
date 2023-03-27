import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurgeonService, Surgeon } from '../services/surgeon.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  selectedSurgeonId : number;
  sidebarVisible : boolean;
  surgeonList : Observable<Surgeon[]>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private surgeonService : SurgeonService)
  {
    this.selectedSurgeonId = -1
    this.sidebarVisible = true
    this.surgeonList = surgeonService.getSurgeons()
  }

  ngOnInit(): void
  {

    this.route.queryParams.subscribe(param =>
    {
      this.selectedSurgeonId = param['surgeonId']
    })

    if (this.selectedSurgeonId == null) {
      console.warn('Surgeon ID is recievied as null to ChatComponent');
    }

  }

  getSurgeonId(): number {
    return this.selectedSurgeonId;
  }

  setSurgeionId(id : number): void {
    this.selectedSurgeonId = id
  }

}
