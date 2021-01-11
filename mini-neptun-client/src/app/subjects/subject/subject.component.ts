import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/core/services/subject.service';
import { RatingComponent } from 'src/app/rating/rating.component';


@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        public ss: SubjectService,
        public dialog: MatDialog,
    ) {
        route.paramMap.subscribe(params => {
            const id = parseInt(params.get('id')!);
            ss.getSubject(id);
        })
    }

    ngOnInit(): void {
    }

    openRating(): void {
        const dialogRef = this.dialog.open(RatingComponent, {
            // height: '400px',
            width: '200px',
        });
    }

}
