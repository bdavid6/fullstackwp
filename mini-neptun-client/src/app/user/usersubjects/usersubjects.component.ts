import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import decode from 'jwt-decode';
import { ResultService } from 'src/app/core/services/result.service';

@Component({
  selector: 'app-usersubjects',
  templateUrl: './usersubjects.component.html',
  styleUrls: ['./usersubjects.component.scss']
})
export class UsersubjectsComponent implements OnInit {

  constructor(
    public us: UserService,
    private rs: ResultService,
  ) {
    // us.getUser();
    us.user$.subscribe(
      user => {
        us.getUserSubjects(user.id);
      }
    )
  }

  ngOnInit(): void {
    this.us.getUserSubjects(decode<{sub: number}>(localStorage.getItem('token')!).sub);
  }

  deleteSubject(sid: number): void {
    this.us.user$.subscribe(user => {
      this.rs.deleteResult(user.id, sid);
      this.us.getUserSubjects(user.id);
    });
  }

}
