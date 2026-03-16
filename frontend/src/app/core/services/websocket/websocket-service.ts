import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private StompClient: Client;
  private messageSubject: Subject<any> = new Subject<any>();
  public messages$ = this.messageSubject.asObservable();
  private apiUrl = 'ws://localhost:8080/ws-estanciero/websocket';

  constructor() {
    this.StompClient = new Client({
      brokerURL: this.apiUrl,
      connectHeaders: {
        //para luego agregar token
        //'Authorization': 'Bearer '
      },
      debug: (str) => {
        console.log('STOMP:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.StompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      //suscripcion a los topics
      this.StompClient.subscribe('/topic/test', (message: Message) => {
        if (message.body) {
          try {
            this.messageSubject.next(JSON.parse(message.body));
          } catch (e) {
            this.messageSubject.next(message.body);
          }
        }
      });

      this.StompClient.onStompError = (frame) => {
        console.error('Error de STOMP: ' + frame.headers['message']);
        console.error('Detalles: ' + frame.body);
      };
    };
  }

  public connect(): void {
    this.StompClient.activate();
  }
  public disconnect(): void {
    if (this.StompClient.active) {
      this.StompClient.deactivate();
    }
  }

  public sendMessage(destination: string, body: any): void {
    if (this.StompClient.active) {
      this.StompClient.publish({
        destination: destination,
        body: JSON.stringify(body),
      });
    } else {
      console.warn('El cliente STOMP no esta conectado');
    }
  }
}
