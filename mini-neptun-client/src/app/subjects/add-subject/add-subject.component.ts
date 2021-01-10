import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SubjectService } from 'src/app/core/services/subject.service';
import { Subject } from 'src/app/core/interfaces/subject';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { BuildingService } from 'src/app/core/services/building.service';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  public addSubjectForm!: FormGroup;
  userRole$: Observable<boolean>;
  //public addSubjectForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSubjectComponent>,
    public ss: SubjectService,
    private ns: NotificationService,
    private as: AuthService,
    public bs: BuildingService,
  ) { 
    this.userRole$ = as.getRole();

    bs.getBuildings();

    this.addSubjectForm = this.formBuilder.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      description: [null, Validators.required],
      credit: [null, Validators.required],
      building: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addSubject(form: FormGroup) {
    if(form.valid) {
      this.ss.addSubject(<Subject>form.value);
      this.addSubjectForm.reset();
    } else {
      this.ns.show("Nem sikerült létrehozni")
    }
  }

}
