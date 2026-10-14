import React from 'react';

interface ControlsProps {
  gameMode: 'pvp' | 'pve';
  setGameMode: (mode: 'pvp' | 'pve') => void;
  aiDifficulty: 'easy' | 'medium' | 'hard';
  setAiDifficulty: (diff: 'easy' | 'medium' | 'hard') => void;
  aiPlayerColor: 'black' | 'white';
  setAiPlayerColor: (color: 'black' | 'white') => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  gameMode,
  setGameMode,
  aiDifficulty,
  setAiDifficulty,
  aiPlayerColor,
  setAiPlayerColor,
  onReset
}) => {
  return (
    <div className="controls-container">
      <div className="control-group">
        <label>モード:</label>
        <button
          className={gameMode === 'pvp' ? 'btn active' : 'btn'}
          onClick={() => setGameMode('pvp')}
        >
          2人プレイ
        </button>
        <button
          className={gameMode === 'pve' ? 'btn active' : 'btn'}
          onClick={() => setGameMode('pve')}
        >
          対AI
        </button>
      </div>

      {gameMode === 'pve' && (
        <div className="ai-controls">
          <div className="control-group">
            <label>難易度:</label>
            <select
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            >
              <option value="easy">初級 (Easy)</option>
              <option value="medium">中級 (Medium)</option>
              <option value="hard">上級 (Hard)</option>
            </select>
          </div>
          <div className="control-group">
            <label>AIの色:</label>
            <button
              className={aiPlayerColor === 'white' ? 'btn active' : 'btn'}
              onClick={() => setAiPlayerColor('white')}
            >
              白 (後手)
            </button>
            <button
              className={aiPlayerColor === 'black' ? 'btn active' : 'btn'}
              onClick={() => setAiPlayerColor('black')}
            >
              黒 (先手)
            </button>
          </div>
        </div>
      )}

      <button className="btn reset-btn" onClick={onReset}>
        リセット
      </button>
    </div>
  );
};
