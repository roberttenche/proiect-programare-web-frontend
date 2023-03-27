import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SurgeonService, Surgeon } from '../services/surgeon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  surgeonList: Observable<Surgeon[]> | undefined;

  constructor(private router: Router, private surgeonService : SurgeonService)
  {
  }

  ngOnInit(): void
  {
    this.surgeonList = this.surgeonService.getSurgeons()
  }

  sendMessageRedirect(surgeonId: number): void {

    // let userData = {
    //   'token': localStorage.getItem('token'),
    //   'userId': localStorage.getItem('userId')
    // }

    // if (userData.token == null || userData.userId == null) {
    //   alert('To watch movie, please login')
    //   throw new Error("Login required")
    // }

    let letParams = new HttpParams()
      .append("surgeonId", surgeonId)

    // this.http.post(this.checkTokenValidity_url, letParams).subscribe((res : any) => {
    //   if ( res ){
    //     alert('check if user bought movie')
    this.router.navigate(['/chat'], {queryParams: { surgeonId: surgeonId}})

    //   } else {
    //     alert('Please log in again')
    //   }
    // });
  }

  // let movieId = this.route.snapshot.paramMap.get('id')
}
