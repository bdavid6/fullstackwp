import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import decode from 'jwt-decode';
import { UserService } from './user.service';

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
    private ns: NotificationService,
    private us: UserService,
  ) { }

  isLogin$ = new BehaviorSubject<boolean>(this.hasToken());
  userRole$ = new BehaviorSubject<boolean>(this.checkRole());

  protected hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  protected checkRole(): boolean {
    if (this.hasToken()) {
      if (decode<User>(localStorage.getItem('token')!).role == 'ADMIN') {
        return true;
      }
    }
    return false;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin$.asObservable();
  }

  getRole(): Observable<boolean> {
    return this.userRole$.asObservable();
  }

  register(user: User) {
    this.http.post<User>(`${baseUrl}/auth/register`, user, { headers: this.headers }).subscribe(
      data => {
        console.log(data);
        this.ns.show('Regisztráció sikeres');
      },
      error => {
        this.ns.show('Regisztráció sikertelen');
        console.error(error);
      }
    );
  }

  login(user: User) {
    this.http.post<{ token: string }>(`${baseUrl}/auth/login`, user, { headers: this.headers }).subscribe(
      data => {
        const tokenPayload = decode<User>(data.token);

        localStorage.setItem('token', data.token);
        //id
        let userId: number = parseInt(atob(data.token.split('.')[1]).split(':')[1].split(',')[0]);
        //console.log(userId)
        //ADMIN = true, SUDENT = false
        if (tokenPayload.role == 'ADMIN') {
          this.userRole$.next(true);
        } else {
          this.userRole$.next(false);
        }
        this.isLogin$.next(true);
        this.us.getUser(decode<{ sub: number }>(localStorage.getItem('token')!).sub);
        this.ns.show('Sikeres bejelentkezés');
        this.router.navigate(['/subjects']);
      },
      error => {
        this.ns.show('Bejelentkezés sikertelen');
        console.error(error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    //localStorage.removeItem('role');
    this.isLogin$.next(false);
    this.ns.show('Kijelentkezés sikeres');
    this.router.navigate(['/']);
  }
}
