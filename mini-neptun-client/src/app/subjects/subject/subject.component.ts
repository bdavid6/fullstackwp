import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/core/services/result.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { RatingComponent } from 'src/app/rating/rating.component';


@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

    private id: number = 0;

    constructor(
        private route: ActivatedRoute,
        public ss: SubjectService,
        public rs: ResultService,
        public dialog: MatDialog,
    ) {
        route.paramMap.subscribe(params => {
            const id = parseInt(params.get('id')!);
            this.id = id;
            ss.getSubject(id);
            rs.getSubjectResults(id);
            ss.getStudents(id);
            console.log("Itt jó")
        })
    }

    ngOnInit(): void {
    }

    openRating(): void {
        // console.log("result id: " + rid);
        const dialogRef = this.dialog.open(RatingComponent, {
            // height: '400px',
            width: '200px',
        });
    }

    getResult(uid: number): void {
        // let r: number = this.ss.students$.getValue().find(s => s.id == uid)!.results.find(r => r.sid.id == this.id)!.mark;
        // this.ss.getStudents(this.id).then(data => console.log(data[0].results))
        // console.log(r);
        // return r;
    }
}
