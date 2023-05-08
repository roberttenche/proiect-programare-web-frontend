import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Surgeon } from '../models/surgeon.model';
import { SurgeonService } from '../services/surgeon.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  selectedSurgeonId : number;
  chatVisible : boolean;
  surgeonList : Observable<Surgeon[]>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private surgeonService : SurgeonService)
  {
    this.selectedSurgeonId = -1
    this.chatVisible = false
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
    else 
    {
      this.chatVisible = true
    }

  }

  getSelectedSurgeonId(): number
  {
    return this.selectedSurgeonId;
  }

  setSelectedSurgeonId(id : number): void {
    this.selectedSurgeonId = id
    this.chatVisible=true
  }

}
