export type Player = 'black' | 'white';
export type DiscType = Player | null;
export type BoardState = DiscType[][];

export const BOARD_SIZE = 8;

export const createInitialBoard = (): BoardState => {
  const board: BoardState = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  const mid = BOARD_SIZE / 2;
  board[mid - 1][mid - 1] = 'white';
  board[mid - 1][mid] = 'black';
  board[mid][mid - 1] = 'black';
  board[mid][mid] = 'white';
  return board;
};

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

export const isValidMove = (board: BoardState, row: number, col: number, player: Player): boolean => {
  if (board[row][col] !== null) return false;
  const opponent: Player = player === 'black' ? 'white' : 'black';

  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr;
    let c = col + dc;
    let hasOpponentBetween = false;

    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      if (board[r][c] === opponent) {
        hasOpponentBetween = true;
      } else if (board[r][c] === player) {
        if (hasOpponentBetween) return true;
        break;
      } else {
        break;
      }
      r += dr;
      c += dc;
    }
  }
  return false;
};

export const getValidMoves = (board: BoardState, player: Player): [number, number][] => {
  const moves: [number, number][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (isValidMove(board, r, c, player)) {
        moves.push([r, c]);
      }
    }
  }
  return moves;
};

export const makeMove = (board: BoardState, row: number, col: number, player: Player): { newBoard: BoardState; flippedDiscs: [number, number][] } => {
  const newBoard = board.map(rowArr => [...rowArr]);
  const opponent: Player = player === 'black' ? 'white' : 'black';
  const flippedDiscs: [number, number][] = [];

  newBoard[row][col] = player;
  flippedDiscs.push([row, col]);

  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr;
    let c = col + dc;
    const currentFlips: [number, number][] = [];

    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      if (newBoard[r][c] === opponent) {
        currentFlips.push([r, c]);
      } else if (newBoard[r][c] === player) {
        if (currentFlips.length > 0) {
          for (const [fr, fc] of currentFlips) {
            newBoard[fr][fc] = player;
            flippedDiscs.push([fr, fc]);
          }
        }
        break;
      } else {
        break;
      }
      r += dr;
      c += dc;
    }
  }

  return { newBoard, flippedDiscs };
};

export const getScores = (board: BoardState): { black: number; white: number } => {
  let black = 0;
  let white = 0;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === 'black') black++;
      if (board[r][c] === 'white') white++;
    }
  }
  return { black, white };
};

export const isGameOver = (board: BoardState): boolean => {
  const blackMoves = getValidMoves(board, 'black');
  const whiteMoves = getValidMoves(board, 'white');
  
  if (blackMoves.length === 0 && whiteMoves.length === 0) return true;

  // Check if board is full
  let isFull = true;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === null) {
        isFull = false;
        break;
      }
    }
    if (!isFull) break;
  }
  return isFull;
};
