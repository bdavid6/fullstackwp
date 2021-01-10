import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    public us: UserService,
  ) {
    us.getUser(decode<{sub: number}>(localStorage.getItem('token')!).sub);
  }

  ngOnInit(): void {
  }

}
