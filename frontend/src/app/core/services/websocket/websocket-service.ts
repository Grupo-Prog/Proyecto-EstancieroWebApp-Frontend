import { inject, Injectable, signal } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification-service';
import { WebsocketState } from '../../models/interfaces/websocket-state';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private apiUrl = 'ws://localhost:8080/ws-estanciero/websocket';
  private stompClient: Client;

  private messageSubject: Subject<any> = new Subject<any>();
  public messages$ = this.messageSubject.asObservable();

  private notifications = inject(NotificationService);

  private _connectionState = signal<WebsocketState>({ status: 'idle' });
  public connectionState = this._connectionState.asReadonly();

  constructor() {
    this.stompClient = new Client({
      brokerURL: this.apiUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log('STOMP:', str),
    });
    this.initHandlers();
  }

  public connect(): void {
    this.stompClient.activate();
  }
  public disconnect(): void {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }

  public sendMessage(destination: string, body: any): void {
    if (this.stompClient.active) {
      this.stompClient.publish({ destination, body: JSON.stringify(body) });
    } else {
      const errorMessage = 'Sin conexión. El mensaje no fue enviado.';
      this._connectionState.set({ status: 'error', errorMessage });
      this.notifications.showWarning(errorMessage);
    }
  }

  private initHandlers(): void {
    this.stompClient.onConnect = (frame) => {
      console.log('Conectado:', frame);
      this._connectionState.set({ status: 'connected' });
      this.notifications.showSuccess('Conexión establecida.');

      ////////////////
      //suscripciones
      this.stompClient.subscribe('/topic/test', (message: Message) => {
        if (message.body) {
          try {
            this.messageSubject.next(JSON.parse(message.body));
          } catch {
            this.messageSubject.next(message.body);
          }
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      this.handleError(frame.headers['message'] ?? 'Error desconocido en STOMP');
    };

    this.stompClient.onWebSocketError = () => {
      this.handleError('No se pudo conectar al servidor.');
    };

    this.stompClient.onDisconnect = (frame) => {
      console.warn('Websocket desconectado:', frame);
      this._connectionState.set({ status: 'disconnected' });
      this.notifications.showWarning('Conexión perdida. Reconectando...');
    };
  }

  private handleError(errorMessage: string): void {
    console.error(errorMessage);
    this._connectionState.set({ status: 'error', errorMessage });
    this.notifications.showError(errorMessage);
  }
}
