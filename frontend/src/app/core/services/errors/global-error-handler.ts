import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationService } from '../notification/notification-service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private notifications = inject(NotificationService);

  handleError(error: unknown): void {
    console.log('Error global capturado:', error);
    this.notifications.showError('Ocurrió un error inesperado.');
  }
}
