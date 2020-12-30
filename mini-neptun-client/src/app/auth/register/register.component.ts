import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public pwdMatch = new BehaviorSubject<boolean>(true);

  constructor(
    private formBuilder: FormBuilder,
    private as: AuthService,
  ) {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      e_mail: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required],
      password: [null, Validators.required],
      password2: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register(form: FormGroup) {
    if(form.valid && form.value.password == form.value.password2) {
      this.as.register(<User>form.value);
      this.pwdMatch.next(true)
    } else {
      this.pwdMatch.next(false)
    }
  }

  public isPwdMatch(): Observable<boolean> {
    return this.pwdMatch.asObservable();
  }
}
