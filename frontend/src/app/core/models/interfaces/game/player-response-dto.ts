import {BotDifficultyType} from '../../enums/bot-difficulty-type.enum';
import {ColorType} from '../../enums/color-type.enum';

export interface PlayerResponseDTO {
  id: number;
  color: ColorType;
  cash: number;
  position: number;
  playerType: string;
  userId: number;
  name: string;
  difficulty: BotDifficultyType;
}
