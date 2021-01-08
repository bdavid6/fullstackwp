import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private ts: Title,
  ) { }

  ngOnInit(): void {
  }

  public setTitle(title: string) {
    this.ts.setTitle(title);
  }
}
