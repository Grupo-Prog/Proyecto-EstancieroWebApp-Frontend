import {PlayerResponseDTO} from './player-response-dto';
import {GameStatusType} from '../../enums/game-status-type.enum';
import {BoardResponseDTO} from './board-response-dto';

export interface GameResponseDTO {
  id: number;
  players: PlayerResponseDTO[];
  currentTurnIndex: number;
  turnOrder: number[];
  board: BoardResponseDTO;
  status: GameStatusType;
}
