import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public rateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.rateForm = this.formBuilder.group({
      result: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  rate(): void {

  }

}
