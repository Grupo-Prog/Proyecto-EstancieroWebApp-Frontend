import { Component, OnInit, OnDestroy, NgZone, inject } from '@angular/core';
import { WebsocketService } from '../websocket/websocket-service';
import { Subscription } from 'rxjs';
import { CommonModule, NgFor, JsonPipe } from '@angular/common';
import { NotificationService } from '../notification/notification-service';

@Component({
  selector: 'app-test-ws',
  imports: [CommonModule, JsonPipe, NgFor],
  template: `
    <div style="padding: 20px; border: 1px solid #ccc;">
      <h3>WebSocket Test Panel</h3>

      <button (click)="conectar()">1. Conectar</button>
      <button (click)="desconectar()">Desconectar</button>

      <hr />

      <input #msgInput type="text" placeholder="Escribe un mensaje..." />
      <button (click)="enviar(msgInput.value); msgInput.value = ''">2. Enviar Mensaje</button>

      <hr />
      <button (click)="testSuccess()">Success</button>
      <button (click)="testWarning()">Warning</button>
      <button (click)="testError()">Error</button>

      <h4>Mensajes Recibidos:</h4>
      <ul>
        <li *ngFor="let m of historial">
          {{ m.msj || m.content || m | json }}
        </li>
      </ul>
    </div>
  `,
})
export class TestWsComponent implements OnInit, OnDestroy {
  historial: any[] = [];
  private sub!: Subscription;
  private notifications = inject(NotificationService);

  constructor(
    private wsService: WebsocketService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    // Nos suscribimos al flujo de mensajes que explicamos antes
    this.sub = this.wsService.messages$.subscribe((msg) => {
      console.log('Llegó al componente:', msg);

      this.zone.run(() => {
        this.historial = [...this.historial, msg];
      });
    });
  }

  testSuccess() {
    this.notifications.showSuccess('Conexión establecida.');
  }
  testWarning() {
    this.notifications.showWarning('Conexión perdida.');
  }
  testError() {
    this.notifications.showError('Error del servidor.');
  }

  conectar() {
    this.wsService.connect();
  }

  desconectar() {
    this.wsService.disconnect();
  }

  enviar(texto: string) {
    this.wsService.sendMessage('/app/test', { content: texto });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
