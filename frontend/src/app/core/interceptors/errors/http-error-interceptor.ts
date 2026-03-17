import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification/notification-service';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        //redirigir al login
      } else if (error.status >= 500) {
        inject(NotificationService).showError('Error del servidor.');
      }
      return throwError(() => error);
    }),
  );
};
