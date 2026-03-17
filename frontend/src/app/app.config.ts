import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/services/errors/global-error-handler';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/interceptors/errors/http-error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
