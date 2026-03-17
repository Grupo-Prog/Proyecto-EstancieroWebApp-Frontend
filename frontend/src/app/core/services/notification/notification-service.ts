import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private baseConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
  };

  showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      ...this.baseConfig,
      panelClass: ['snack-error'],
    });
  }

  showWarning(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      ...this.baseConfig,
      panelClass: ['snack-warning'],
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      ...this.baseConfig,
      duration: 2500,
      panelClass: ['snack-success'],
    });
  }
}
