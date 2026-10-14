import React from 'react';
import type { DiscType } from '../logic/othelloGame';
import { Disc } from './Disc';

interface SquareProps {
  row: number;
  col: number;
  value: DiscType;
  isValidMove: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({ value, isValidMove, onClick }) => {
  return (
    <div className="square" onClick={onClick}>
      <Disc value={value} />
      {isValidMove && !value && <div className="valid-move-dot" />}
    </div>
  );
};
