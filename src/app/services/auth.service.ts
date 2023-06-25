import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, windowTime } from 'rxjs';
import { User } from '../models/user.model';
import { AuthenticationRequest } from '../models/auth.request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth_url = 'http://localhost:8080/auth/';

  private constructor(private http:HttpClient) { }

  registerUser(user : User, authRequest: AuthenticationRequest) : Observable<string>
  {
    this.logOut()
    return this.http.post<string>(this.auth_url + "register" , 
    {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "role": "USER",
      "username": authRequest.username,
      "password": authRequest.password
    })
    .pipe(
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  loginUser(authRequest: AuthenticationRequest) : Observable<string>
  {
    this.logOut()
    return this.http.post<string>(this.auth_url + "authenticate" , 
    {
      "username": authRequest.username,
      "password": authRequest.password
    })
    .pipe(
      catchError(err => {
        throw new Error(err);
      })
    );
  }

  getToken() : string | null
  {
    return localStorage.getItem("token")
  }

  setToken(token : string)
  {
    localStorage.setItem("token", token)
  }

  getUserId() : number
  {
    return parseInt(localStorage.getItem("userId") as string)
  }

  setUserId(userId: number)
  {
    localStorage.setItem("userId", String(userId))
  }

  logOut()
  {
    localStorage.clear()
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
  }

}