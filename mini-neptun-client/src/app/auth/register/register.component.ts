import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private as: AuthService,
    private ns: NotificationService,

  ) {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      e_mail: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  register(form: FormGroup) {
    if(form.valid) {
      this.as.register(<User>form.value);
    } else {
      console.log(form.errors);
      this.ns.show("Töltse ki az üres mezőket");
    }
  }
}
