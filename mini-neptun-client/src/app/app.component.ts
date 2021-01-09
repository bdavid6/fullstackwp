import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router'

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
    public router: Router
  ) {
    ts.setTitle(this.title);
    this.isLoggedIn$ = as.isLoggedIn();
  }

  public setTitle(title: string) {
    this.ts.setTitle(title);  // Dokumentum címének beállítása.
  }

  logout(): void {
    this.as.logout();
  }

}
