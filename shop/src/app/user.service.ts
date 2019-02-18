import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';


export interface Response {
  success: boolean,
  data: User[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basicURL = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) { }

  checkLogin(email, password) {

    const loginURL = this.basicURL + "login";
    console.log("checkLogin with URL", loginURL);
    const params = {
      email: email,
      password: password
    }
    console.log("body : ", params);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let rtn = this.http.post(loginURL, params, httpOptions).pipe(
      map(
        (response: Response) => {
          console.log("returned data", response);
          return response.success;
        })).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Error occured");
          }
        );
  }

}
