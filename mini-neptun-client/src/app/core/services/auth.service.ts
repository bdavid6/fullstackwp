import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '',
  })

  constructor(
    private http: HttpClient,
  ) { }

  register(user: User) {
    this.http.post<User>(`${baseUrl}/auth/register`, user, {headers: this.headers}).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
