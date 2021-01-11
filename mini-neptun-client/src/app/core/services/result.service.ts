import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Result } from '../interfaces/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  public results$ = new BehaviorSubject<Result[]>([])

  constructor(
    private http: HttpClient,
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
}
