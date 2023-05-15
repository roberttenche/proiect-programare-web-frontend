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

  }

  getSurgeonById(id : number)
  {
    return this.http.get<Surgeon>(this.surgeons_url + "/" + id.toString())
  }
}
