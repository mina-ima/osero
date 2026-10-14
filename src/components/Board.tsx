import React from 'react';
import type { BoardState } from '../logic/othelloGame';
import { Square } from './Square';

interface BoardProps {
  board: BoardState;
  validMoves: [number, number][];
  onSquareClick: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({ board, validMoves, onSquareClick }) => {
  const isValid = (r: number, c: number) => {
    return validMoves.some(([vr, vc]) => vr === r && vc === c);
  };

  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <Square
              key={`${r}-${c}`}
              row={r}
              col={c}
              value={cell}
              isValidMove={isValid(r, c)}
              onClick={() => onSquareClick(r, c)}
            />
          ))
        )}
      </div>
    </div>
  );
};
