import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Result } from '../interfaces/result';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  public results$ = new BehaviorSubject<Result[]>([])

  constructor(
    private http: HttpClient,
    private ns: NotificationService,
  ) { }

  public getResults(): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get(`${baseUrl}/results`, { headers: header }).subscribe(
      i => {
        console.log("hello");
        console.log(i);
      }
    )
  }

  public addResult(uid: number, sid: number, mark: number): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.post(`${baseUrl}/results`, {uid: uid, sid: sid, mark: mark}, { headers: header }).subscribe(
      i => {
        console.log("hello");
        console.log(i);
        this.ns.show("Sikeres tárgyfelvétel!");
      },
      error => {
        this.ns.show("Sikertelen tárgyfelvétel!");
      }
    )
  }

  public getSubjectResults(sid: number): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get<Result[]>(`${baseUrl}/results/subject/${sid}`, { headers: header }).subscribe(
      i => {
        console.log("hello");
        console.log(i);
        this.results$.next(i);
      }
    )
  }

  deleteResult(uid: number, sid: number): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.delete(`${baseUrl}/results/${sid}/${uid}`, { headers: header }).subscribe(
      i => {
        console.log("hello");
        console.log(i);
        this.ns.show("Sikeres tárgyleadás!");
      },
      error => {
        this.ns.show("Sikertelen tárgyleadás!");
      }
    )
  }
}
