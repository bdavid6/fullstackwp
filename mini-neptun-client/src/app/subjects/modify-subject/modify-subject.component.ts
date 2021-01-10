import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/core/interfaces/subject';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-modify-subject',
  templateUrl: './modify-subject.component.html',
  styleUrls: ['./modify-subject.component.scss']
})
export class ModifySubjectComponent implements OnInit {

  private id!: number;
  public modifySubjectForm!: FormGroup;
  userRole$: Observable<boolean>

  constructor(
    public ss: SubjectService,
    private formBuilder: FormBuilder,
    private ns: NotificationService,
    private as: AuthService
  ) {
    this.userRole$ = as.getRole();
    
    this.ss.subject$.subscribe(
      value => {
        this.id = value.id;
        this.modifySubjectForm = this.formBuilder.group({
          name: [value.name, Validators.required],
          code: [value.code, Validators.required],
          description: [value.description, Validators.required],
          credit: [value.credit, Validators.required],
        });
      }
    )
  }

  ngOnInit(): void {
  }

  modifySubject(form: FormGroup): void {
    let subject = <Subject>form.value;
    subject.id = this.id;
    if(form.valid) {
      this.ss.modifySubject(subject);
    } else {
      this.ns.show("Nem sikerült módosítani (component)")
      console.log(subject)
    }
  }
}
