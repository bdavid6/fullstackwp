import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Building } from '../interfaces/building';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  public buildings$ = new BehaviorSubject<Building[]>([]);

  constructor(
    private http: HttpClient,
    private ns: NotificationService,
  ) { }

  public getBuildings(): void {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.get<Building[]>(`${baseUrl}/buildings`, { headers: header }).subscribe(
      data => {
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

  public deleteBuilding(id: number): void {
    const header = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    this.http.delete(`${baseUrl}/buildings/${id}`, { headers: header, responseType: 'text' }).subscribe(
      res => {
        let b: Building[] = this.buildings$.getValue().filter(element => element.id !== id);
        this.buildings$.next(b);
        // console.log(res);
        this.ns.show('Épület törlése megtörtént!');
      },
      error => {
        this.ns.show('Nem sikerült törölni');
        console.error(error);
      }
    )
  }
}
