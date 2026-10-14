import React from 'react';
import type { Player } from '../logic/othelloGame';

interface GameInfoProps {
  scores: { black: number; white: number };
  turn: Player;
  isGameOver: boolean;
  winner: Player | 'draw' | null;
  passMessage: string | null;
}

export const GameInfo: React.FC<GameInfoProps> = ({ scores, turn, isGameOver, winner, passMessage }) => {
  return (
    <div className="game-info">
      <div className={`score-card black ${turn === 'black' && !isGameOver ? 'active' : ''}`}>
        <div className="disc black"><div className="disc-inner" /></div>
        <div className="score-details">
          <span className="player-name">黒 (Black)</span>
          <span className="score-count">{scores.black}</span>
        </div>
      </div>

      <div className="status-container">
        {isGameOver ? (
          <div className="game-over-banner">
            <h2>ゲーム終了</h2>
            <p>
              {winner === 'draw'
                ? '引き分けです！'
                : `${winner === 'black' ? '黒 (Black)' : '白 (White)'} の勝利です！`}
            </p>
          </div>
        ) : (
          <div className="turn-banner">
            <span>{turn === 'black' ? '黒のターン' : '白のターン'}</span>
            {passMessage && <p className="pass-message">{passMessage}</p>}
          </div>
        )}
      </div>

      <div className={`score-card white ${turn === 'white' && !isGameOver ? 'active' : ''}`}>
        <div className="disc white"><div className="disc-inner" /></div>
        <div className="score-details">
          <span className="player-name">白 (White)</span>
          <span className="score-count">{scores.white}</span>
        </div>
      </div>
    </div>
  );
};
