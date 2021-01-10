import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { NotificationService } from './notification.service';
import { Subject } from '../interfaces/subject';
import { Building } from '../interfaces/building';
import { trigger } from '@angular/animations';
import { BuildingService } from './building.service';
import { TagContentType } from '@angular/compiler';
import { Router } from '@angular/router';

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
  public subject$ = new BehaviorSubject<Subject>(<Subject>{})

  constructor(
    private http: HttpClient,
    private ns: NotificationService,
    private bs: BuildingService,
    private router: Router,
  ) { }

  public getSubjects(): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get<Subject[]>(`${baseUrl}/subjects`, { headers: header }).subscribe(
      i => {
        this.subjects$.next(i);
      }
    )
  }

  public getSubject(id: number): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get<Subject>(`${baseUrl}/subjects/${id}`, { headers: header }).subscribe(
      i => {
        this.subject$.next(i);
      },
      error => {
        console.log(error);
        this.router.navigate(['/404']);
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
      },
      error => {
        this.ns.show('Nem sikerült létrehozni');
        console.error(error);
      }
    )
  }

  public modifySubject(subject: Subject) {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.put<Subject>(`${baseUrl}/subjects/${subject.id}`, subject, { headers: header }).subscribe(
      () => {
        // this.subjects$.next(this.subjects$.getValue().concat([newsubjet]));
        let s: Subject[] = this.subjects$.getValue().map<Subject>(element => {
          if (element.id === subject.id) {
            return subject;
          }
          return element;
        });
        this.subjects$.next(s);
        this.ns.show('Tárgy módosítva');
      },
      error => {
        this.ns.show('Nem sikerült módosítani');
        console.error(error);
        console.log(subject.id)
      }
    )

  }

  public deleteSubject(id: number) {
    const header = new HttpHeaders({
      'Content-Type': 'text/html',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    this.http.delete(`${baseUrl}/subjects/${id}`, { headers: header, responseType: 'text' }).subscribe(
      res => {
        let s: Subject[] = this.subjects$.getValue().filter(element => element.id !== id);
        this.subjects$.next(s);
        console.log(res);
        this.ns.show('Tárgy törlése megtörtént!');
      },
      error => {
        this.ns.show('Nem sikerült törölni');
        console.error(error);
      }
    )
  }
}
