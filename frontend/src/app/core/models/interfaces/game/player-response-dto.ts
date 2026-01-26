import {BotDifficultyType} from '../../enums/bot-difficulty-type.enum';

export interface PlayerResponseDTO {
  id: number;
  color: string;
  cash: number;
  position: number;
  playerType: string;
  userId: number;
  name: string;
  difficulty: BotDifficultyType;
}
