import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-usersubjects',
  templateUrl: './usersubjects.component.html',
  styleUrls: ['./usersubjects.component.scss']
})
export class UsersubjectsComponent implements OnInit {

  constructor(
    public us: UserService,
  ) { }

  ngOnInit(): void {
    this.us.getUserSubjects(decode<{sub: number}>(localStorage.getItem('token')!).sub);
  }

}
