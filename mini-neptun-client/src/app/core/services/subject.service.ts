import { Injectable } from '@angular/core';
import { Subject } from '../interfaces/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  pelda: Subject[] = [
    { name: 'Matek', code: 1, description: 'desc1', credit: 3 },
    { name: 'Prog', code: 2, description: 'desc2', credit: 5 }
  ];

  constructor() { }

  public getSubjects(): Subject[] {
    return this.pelda;
  }
}
