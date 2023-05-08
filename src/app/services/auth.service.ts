import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, windowTime } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth_url = 'http://localhost:8080/auth/';

  private constructor(private http:HttpClient) { }

  // saveUser(user: User) {
  //   localStorage.setItem("token", window.btoa(JSON.stringify(user)))
  // }

  // getToken(){
  //   return localStorage.getItem("token");
  // }

  registerUser(user : User) : Observable<string>
  {
    this.logOut()
    return this.http.post<string>(this.auth_url + "register" , 
    {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "username": user.username,
      "email": user.email,
      "password": user.password,
      "role": "USER"
    })
    .pipe(
      catchError((err: any) => {
        console.error(err);
        return of("");
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

  getUserId() : string | null
  {
    return localStorage.getItem("userId")
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

  checkIfLoggedIn()
  {
    
  }

  // updateUser(user: User) {
  //   return this.http.put(this.configUrl + "update/" + user.userId, {
  //     "password": user.userPassword,
  //     "username": user.userName

  //   })
  //   .pipe(catchError(this.handleError));
  // }

  // private getUsersList():Observable<User[]> {
  //   return this.http.get<User[]>(this.configUrl + "users").pipe(
  //     catchError(this.handleError));
  // }

  // getUserByUsername(username:string) {
  //   return this.http.get(this.configUrl + "users/" + username).pipe(
  //     catchError(this.handleError));
  // }

  // handleError(err: HttpErrorResponse){
  //   if(err.status === 404){
  //     alert("Not found");
  //   }
  //   return throwError(() => err);

  // }
}