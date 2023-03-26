import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // let surgeonId = this.route.snapshot.paramMap.get('surgeonId')

    let surgeonId = null

    this.route.queryParams.subscribe(param =>
        {
          surgeonId = param['surgeonId']
        }
      )
        
    if (surgeonId == null) {
      console.warn('Surgeon ID is recievied as null to ChatComponent');
    }

    console.log(surgeonId)

  }

}
