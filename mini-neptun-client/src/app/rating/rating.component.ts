import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Result } from '../core/interfaces/result';
import { NotificationService } from '../core/services/notification.service';
import { ResultService } from '../core/services/result.service';
import { SubjectService } from '../core/services/subject.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public rateForm!: FormGroup;
  private sid!: number;

  constructor(
    private formBuilder: FormBuilder,
    private rs: ResultService,
    private ss: SubjectService,
    private ns: NotificationService,
    public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MatDialogRef) public data: number,
  ) {
    this.rateForm = this.formBuilder.group({
      mark: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
    this.ss.subject$.subscribe(subject => {
      this.sid = subject.id;
    })
    console.log(data);
  }

  ngOnInit(): void {
  }

  rate(form: FormGroup): void {
    this.rs.rid.subscribe(rid => {
      if (form.valid) {
        this.rs.setResult(rid, (<Result>form.value).mark);
        this.rateForm.reset();
        this.dialogRef.close();
        this.ns.show("Értékelve")
      }
      this.rs.getSubjectResults(this.sid);
    })
  }

}
