import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  public show(message: any): void {
    let config = new MatSnackBarConfig();
    config.duration = 1350;
    this.snackBar.open(message, 'X', config);
  }
}
