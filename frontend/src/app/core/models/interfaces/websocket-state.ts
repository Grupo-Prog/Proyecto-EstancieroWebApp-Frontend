export type ConnectionStatus = 'idle' | 'connected' | 'disconnected' | 'error';

export interface WebsocketState {
  status: ConnectionStatus;
  errorMessage?: string;
}
