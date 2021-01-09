import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

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
    private router: Router,
  ) { }

  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());

  protected hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  register(user: User) {
    this.http.post<User>(`${baseUrl}/auth/register`, user, {headers: this.headers}).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  login(user: User) {
    this.http.post<{token: string}>(`${baseUrl}/auth/login`, user, {headers: this.headers}).subscribe(
      data => {
        // console.log(data);
        localStorage.setItem('token', data.token);
        this.isLogin$.next(true);
        //this.ns.show('Sikeres bejelentkezés!');
        this.router.navigate(['/subjects']);
      },
      error => {
        //this.ns.show('HIBA! Bejelentkezés sikertelen!');
        console.error(error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin$.next(false);
    //this.ns.show('Sikeres kijelentkezés!');
    this.router.navigate(['/']);
  }
}
