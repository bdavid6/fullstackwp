import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router'
import decode from 'jwt-decode';
import { User } from './core/interfaces/user';
import { UserService } from './core/services/user.service';
import { BuildingService } from './core/services/building.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Neptun';

    isLoggedIn$: Observable<boolean>;

    constructor(
        private ts: Title,  // Az dokumentum címét lehet beállítani és lekérdezni ennek segítségével.
        protected as: AuthService,
        public router: Router,
        public us: UserService,
        private bs: BuildingService,
    ) {
        ts.setTitle(this.title);
        this.isLoggedIn$ = as.isLoggedIn();
        us.getUser(decode<{sub: number}>(localStorage.getItem('token')!).sub);
    }

    public setTitle(title: string) {
        this.ts.setTitle(title);  // Dokumentum címének beállítása.
    }

    logout(): void {
        this.as.logout();
    }

    logBuildings(): void {
        this.bs.getBuildings();
    }
}
