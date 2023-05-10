import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Surgeon } from '../models/surgeon.model';

@Injectable({
  providedIn: 'root'
})
export class SurgeonService {

  private readonly surgeons_url = 'http://localhost:8080/surgeons'

  constructor(private http: HttpClient)
  {
  }

  ngOnInit(): void
  {
  }

  getSurgeons(): Observable<Surgeon[]> {

    return this.http.get<Surgeon[]>(this.surgeons_url)


    // let srgList: Surgeon[] = [
    //   { id: 0, name: "Salahid Dahari", title: "Head Surgeon", rating: 5, description: "Best surgeon", image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg" },
    //   { id: 1, name: "George Miller", title: "Senior Surgeon", rating: 4, description: "Almost best surgeon", image: "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" },
    //   { id: 2, name: "Susan", title: "Junior Surgeon", rating: 2, description: "Bad surgeon", image: "https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=" }
    // ]
    // return of(srgList)

  }

  getSurgeonById(id : number)
  {
    return this.http.get<Surgeon>(this.surgeons_url + "/" + id.toString())
  }
}
