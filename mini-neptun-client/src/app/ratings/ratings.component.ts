import { Component, OnInit } from '@angular/core';
import { ResultService } from '../core/services/result.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  constructor(
    public rs: ResultService,
    public us: UserService,
  ) {
    us.user$.subscribe(user => {
      rs.getUserResults(user.id);
    })
  }

  ngOnInit(): void {
  }

}
