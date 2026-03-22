import {PlayerResponseDTO} from './player-response-dto';

export interface BoxDTO {
  name: string;
  position: number;
  purchasePrice: number;
  chacrasCount: number;
  hasEstancia: boolean;
  isMortgage: boolean;
  owner: PlayerResponseDTO | null;

}
