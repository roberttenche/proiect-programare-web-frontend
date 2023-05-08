import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Surgeon } from '../models/surgeon.model';
import { SurgeonService } from '../services/surgeon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  surgeonList: Observable<Surgeon[]> | undefined;

  constructor(private router: Router, private surgeonService : SurgeonService)
  {
  }

  ngOnInit(): void
  {
    this.surgeonList = this.surgeonService.getSurgeons()
    this.surgeonList.forEach(surgeon => console.log(surgeon))
  }

  sendMessageRedirect(surgeonId: number): void {

    this.router.navigate(['/chat'], {queryParams: { surgeonId: surgeonId}})

  }

}
