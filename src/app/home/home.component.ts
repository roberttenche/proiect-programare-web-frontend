import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

interface Surgeon {
  id: number,

  name: string,
  title: string,

  rating: number, // 0 - 10
  description: string,

  image: string, // url profile image

}

interface User {
  id: number,
  name: string,
  password: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  surgeonList: Observable<Surgeon[]> | undefined;

  readonly get_surgeon_url = '' // to be defined by backend

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    if (this.get_surgeon_url !== '')
      this.surgeonList = this.getSurgeons();
    else {
      let srgList: Surgeon[] = [
        { id: 0, name: "Salahid Dahari", title: "Head Surgeon", rating: 10, description: "Best surgeon", image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg" },
        { id: 1, name: "George Miller", title: "Senior Surgeon", rating: 8, description: "Almost best surgeon", image: "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" },
        { id: 2, name: "Susan", title: "Junior Surgeon", rating: 5, description: "Bad surgeon", image: "https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=" }
      ]
      this.surgeonList = of(srgList)
    }
  }

  getSurgeons(): Observable<Surgeon[]> {
    return this.http.get<Surgeon[]>(this.get_surgeon_url)
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
