import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorSubject = new Subject<string>();
  public error$ = this.errorSubject.asObservable();

  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
