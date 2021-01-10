import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        public ss: SubjectService,
    ) {
        route.paramMap.subscribe(params => {
            const id = parseInt(params.get('id')!);
            ss.getSubject(id);
        })
    }

    ngOnInit(): void {
    }

}
