import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Building } from '../interfaces/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(
    private http: HttpClient,
    ) {
  }

  public addBuilding(building: Building) {
    const header = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );
    this.http.post<Building>(`${baseUrl}/buildings`, building ,{headers: header}).subscribe(
      data => {
        //console.log(data)
      }, error => {;
        console.error(error);
      }
    )
  }
}
