import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
      username: 
      name:
      e_mail:
      role:
      sum_credit:
      password:
    })
  }

  ngOnInit(): void {
  }

}
