import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly users_url = 'http://localhost:8080/users'

  constructor(private http: HttpClient){}

  ngOnInit(): void
  {
  }

  async getUserById(id : number) : Promise<User>
  {
    return firstValueFrom<User>(this.http.get<User>(this.users_url + "/" + id.toString()))
  }
}
