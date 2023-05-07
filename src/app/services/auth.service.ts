import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, windowTime } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly configUrl = 'http://localhost:8080/auth/';

  private constructor(private http:HttpClient) { }

  // saveUser(user: User) {
  //   localStorage.setItem("token", window.btoa(JSON.stringify(user)))
  // }

  // getToken(){
  //   return localStorage.getItem("token");
  // }

  registerUser(user : User) : Observable<string>
  {
    return this.http.post<string>(this.configUrl + "register" ,
      {
        "username": user.name,
        "password": user.password
      })
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return of(""); 
        })
      );
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