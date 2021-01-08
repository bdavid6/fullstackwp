import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Neptun';

  constructor(
    private ts: Title,  // Az dokumentum címét lehet beállítani és lekérdezni ennek segítségével.
  ) {
    ts.setTitle(this.title);
  }

  public setTitle(title: string) {
    this.ts.setTitle(title);  // Dokumentum címének beállítása.
  }

}
