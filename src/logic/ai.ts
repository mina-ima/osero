import type { BoardState, Player } from './othelloGame';
import { getValidMoves, makeMove } from './othelloGame';

const POSITION_WEIGHTS: number[][] = [
  [120, -20,  20,   5,   5,  20, -20, 120],
  [-20, -40,  -5,  -5,  -5,  -5, -40, -20],
  [ 20,  -5,  15,   3,   3,  15,  -5,  20],
  [  5,  -5,   3,   3,   3,   3,  -5,   5],
  [  5,  -5,   3,   3,   3,   3,  -5,   5],
  [ 20,  -5,  15,   3,   3,  15,  -5,  20],
  [-20, -40,  -5,  -5,  -5,  -5, -40, -20],
  [120, -20,  20,   5,   5,  20, -20, 120]
];

export const getAIMove = (board: BoardState, aiPlayer: Player, difficulty: 'easy' | 'medium' | 'hard'): [number, number] | null => {
  const validMoves = getValidMoves(board, aiPlayer);
  if (validMoves.length === 0) return null;

  if (difficulty === 'easy') {
    const randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];
  }

  if (difficulty === 'medium') {
    let bestMove = validMoves[0];
    let maxFlips = -1;

    for (const [r, c] of validMoves) {
      const { flippedDiscs } = makeMove(board, r, c, aiPlayer);
      const count = flippedDiscs.length - 1;
      if (count > maxFlips) {
        maxFlips = count;
        bestMove = [r, c];
      }
    }
    return bestMove;
  }

  let bestMove = validMoves[0];
  let bestScore = -Infinity;

  for (const [r, c] of validMoves) {
    const score = POSITION_WEIGHTS[r][c];
    if (score > bestScore) {
      bestScore = score;
      bestMove = [r, c];
    }
  }

  return bestMove;
};
