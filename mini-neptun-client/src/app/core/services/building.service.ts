import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Building } from '../interfaces/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  public buildings$ = new BehaviorSubject<Building[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  public getBuildings(): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get<Building[]>(`${baseUrl}/buildings`, { headers: header }).subscribe(
      data => {
        console.log(data)
        this.buildings$.next(data);
      },
      error => {
        console.error(error);
      }
    )
    // return this.buildings$.asObservable();
  }

  public addBuilding(building: Building) {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.post<{id: number}>(`${baseUrl}/buildings`, building, { headers: header }).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.error(error);
      }
    )
  }
}
