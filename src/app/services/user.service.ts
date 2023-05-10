import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Surgeon } from '../models/surgeon.model';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly users_url = 'http://localhost:8080/users'

  constructor(private http: HttpClient){}

  ngOnInit(): void
  {
  }

  getUserById(id : number) : Observable<User>
  {
    return this.http.get<User>(this.users_url + "/" + id.toString())
    // .pipe(
    //   catchError(err => {
    //     throw new Error(err);
    //   })
    // );
  }
}
