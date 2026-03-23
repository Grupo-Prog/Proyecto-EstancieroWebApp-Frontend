import { ColorType } from '../../../core/models/enums/color-type.enum';

// Enlazar los svg de los peones con el enum de los tipos de colores que existen
export const GAME_PIECES_SVG: Record<ColorType, string> = {
  [ColorType.BLUE]: 'assets/board/gamePieces/circlePieces/FichaCirculoAzul.svg',
  [ColorType.RED]: 'assets/board/gamePieces/circlePieces/FichaCirculoRojo.svg',
  [ColorType.GREEN]: 'assets/board/gamePieces/circlePieces/FichaCirculoVerde.svg',
  [ColorType.YELLOW]: 'assets/board/gamePieces/circlePieces/FichaCirculoAmarillo.svg',
  [ColorType.WHITE]: 'assets/board/gamePieces/circlePieces/FichaCirculoBlanco.svg',
  [ColorType.BLACK]: 'assets/board/gamePieces/circlePieces/FichaCirculoNegro.svg'
};

