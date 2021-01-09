import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

//import { AuthService } from '../core/services/auth.service';
import { SubjectService } from '../core/services/subject.service';
import { AddSubjectComponent } from './add-subject/add-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  //isLoggedIn$: Observable<boolean>; CSAK AKKOR KELL HA NINCS AUTHGUARD

  constructor(
    public dialog: MatDialog,
    public ss: SubjectService,
    //private as: AuthService
  ) { 
    //this.isLoggedIn$ = as.isLoggedIn();
  }

  ngOnInit(): void {
    this.ss.getSubjects();
  }

  openAddSubject(): void{
		const dialogRef = this.dialog.open(AddSubjectComponent, {
      height: '400px',
      width: '700px',
    });
  }
  
  deleteSubject(id: number): void {
    this.ss.deleteSubject(id);
  }

}
