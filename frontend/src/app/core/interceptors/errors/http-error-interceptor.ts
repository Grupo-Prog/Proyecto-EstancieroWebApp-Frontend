import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification/notification-service';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          notifications.showError('Sin conexión. Revisá tu red.');
          break;
        case 401:
          notifications.showWarning('Tu sesión expiró. Volvé a ingresar.');
          break;
        case 403:
          notifications.showError('No tenés permisos para esta acción.');
          break;
        case 404:
          notifications.showError('El recurso solicitado no existe.');
          break;
        default:
          if (error.status >= 500) {
            notifications.showError('Error del servidor. Intentá de nuevo.');
          }
      }
      return throwError(() => error);
    }),
  );
};
