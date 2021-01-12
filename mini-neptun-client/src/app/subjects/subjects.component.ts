import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { BuildingService } from '../core/services/building.service';
import { ResultService } from '../core/services/result.service';
import { SubjectService } from '../core/services/subject.service';
import { UserService } from '../core/services/user.service';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ModifySubjectComponent } from './modify-subject/modify-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  userRole$: Observable<boolean>

  constructor(
    public dialog: MatDialog,
    public ss: SubjectService,
    private us: UserService,
    private rs: ResultService,
    private as: AuthService,
    private bs: BuildingService,
  ) {
    this.userRole$ = as.getRole();
    bs.getBuildings();
    // this.userRole$.subscribe(v => {console.log(v)});
  }

  ngOnInit(): void {
    this.ss.getSubjects();
    // if(this.ss.subjects$.value.length > 0){
    //   this.ss.getSubject(this.ss.subjects$.getValue()[0].id);
    // }
  }

  openAddSubject(): void {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      // height: '400px',
      width: '700px',
    });
  }

  openModifySubject(id: number): void {
    this.ss.getSubject(id);
    let db = 0;
    this.ss.subject$.subscribe(subject => {
      if (subject.id && db == 0) {
        ++db;
        const dialogRef = this.dialog.open(ModifySubjectComponent, {
          // height: '400px',
          width: '700px',
        });
      }
    })
  }

  deleteSubject(id: number): void {
    this.ss.deleteSubject(id);
  }

  signUpToSubject(sid: number): void {
    this.us.user$.subscribe(user => {
      console.log("tárgy id: " + sid);
      console.log("user id: " + user.id);
      this.rs.addResult(user.id, sid, 0);
    })
  }

}
