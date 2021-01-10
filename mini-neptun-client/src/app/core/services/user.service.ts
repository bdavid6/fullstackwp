import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserComponent } from 'src/app/user/user.component';
import { baseUrl } from 'src/environments/environment';
import { User } from '../interfaces/user';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$ = new BehaviorSubject<User>(<User>{});

  constructor(
    private http: HttpClient,
  ) {
    this.getUser(decode<{sub: number}>(localStorage.getItem('token')!).sub);
    this.user$.subscribe(v => {
      console.log(v)
    })
  }

  public getUser(id: number): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get<User>(`${baseUrl}/users/${id}` ,{headers: header}).subscribe(
      user => {
        this.user$.next(user);
      }
    )
  }
}
