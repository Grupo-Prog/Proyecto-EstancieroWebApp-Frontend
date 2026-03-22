import {BoxDTO} from './box-response-dto';

export interface BoardResponseDTO {
  id: number;
  boxes: BoxDTO[];
}
