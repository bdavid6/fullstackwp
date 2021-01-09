import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { NotificationService } from './notification.service';
import { Subject } from '../interfaces/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  //lehet hibás a header
  /*headers = new HttpHeaders().set(
    //'Content-Type': 'application/json',
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  )*/

  public subjects$ = new BehaviorSubject<Subject[]>([])

  constructor(
    private http: HttpClient,
    private ns: NotificationService
  ) { }

  public getSubjects(): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get<Subject[]>(`${baseUrl}/subjects` ,{headers: header}).subscribe(
      i => {
        this.subjects$.next(i);
      }
    )
  }

  public addSubject(subject: Subject) {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.post<Subject>(`${baseUrl}/subjects`, subject ,{headers: header}).subscribe(
      newsubjet => {
        this.subjects$.next(this.subjects$.getValue().concat([newsubjet]));
        this.ns.show('Tárgy létrehozva');
      },
      error => {
        this.ns.show('Nem sikerült létrehozni');
        console.error(error);
      }
    )
  }

  public deleteSubject(id: number) {
    const header = new HttpHeaders({
      'Content-Type': 'text/html',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    this.http.delete(`${baseUrl}/subjects/${id}`, {headers: header, responseType: 'text'}).subscribe(
      res => {
        this.getSubjects(); // A még létező tárgyak listájának frissítése.
        console.log(res);
        this.ns.show('Térgy törlése megtörtént!');
      },
      error => {
        this.ns.show('Nem sikerült törölni');
        console.error(error);
      }
    )
  }
}
