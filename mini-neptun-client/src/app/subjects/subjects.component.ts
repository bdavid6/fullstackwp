import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../core/services/subject.service';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { MatDialog } from '@angular/material/dialog';
import { SubjectComponent } from './subject/subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public ss: SubjectService
  ) { }

  ngOnInit(): void {
  }

  openAddSubject(): void {
		const dialogRef = this.dialog.open(AddSubjectComponent, {
      height: '400px',
      width: '700px',
    });
	}

}
