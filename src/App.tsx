import { useState, useEffect } from 'react';
import type {
  BoardState,
  Player
} from './logic/othelloGame';
import {
  createInitialBoard,
  getValidMoves,
  makeMove,
  getScores,
  isGameOver as checkIsGameOver
} from './logic/othelloGame';
import { getAIMove } from './logic/ai';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import { Controls } from './components/Controls';
import './App.css';

export function App() {
  const [board, setBoard] = useState<BoardState>(createInitialBoard());
  const [turn, setTurn] = useState<Player>('black');
  const [gameMode, setGameMode] = useState<'pvp' | 'pve'>('pve');
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [aiPlayerColor, setAiPlayerColor] = useState<'black' | 'white'>('white');
  const [passMessage, setPassMessage] = useState<string | null>(null);

  const scores = getScores(board);
  const gameOver = checkIsGameOver(board);
  const validMoves = getValidMoves(board, turn);

  let winner: Player | 'draw' | null = null;
  if (gameOver) {
    if (scores.black > scores.white) winner = 'black';
    else if (scores.white > scores.black) winner = 'white';
    else winner = 'draw';
  }

  // Handle pass logic and turn switching
  const handleTurnTransition = (currentBoard: BoardState, nextTurn: Player) => {
    let nextPlayer = nextTurn;
    let moves = getValidMoves(currentBoard, nextPlayer);

    if (moves.length === 0 && !checkIsGameOver(currentBoard)) {
      const opponent: Player = nextPlayer === 'black' ? 'white' : 'black';
      const opponentMoves = getValidMoves(currentBoard, opponent);
      if (opponentMoves.length > 0) {
        setPassMessage(`${nextPlayer === 'black' ? '黒' : '白'}は置ける場所がないためパスします。`);
        nextPlayer = opponent;
      } else {
        setPassMessage(null);
      }
    } else {
      setPassMessage(null);
    }

    setTurn(nextPlayer);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameOver) return;
    if (gameMode === 'pve' && turn === aiPlayerColor) return; // AI's turn

    if (!validMoves.some(([vr, vc]) => vr === row && vc === col)) return;

    const { newBoard } = makeMove(board, row, col, turn);
    setBoard(newBoard);

    const nextTurn: Player = turn === 'black' ? 'white' : 'black';
    handleTurnTransition(newBoard, nextTurn);
  };

  // AI turn effect
  useEffect(() => {
    if (gameOver) return;
    if (gameMode === 'pve' && turn === aiPlayerColor) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board, aiPlayerColor, aiDifficulty);
        if (aiMove) {
          const [r, c] = aiMove;
          const { newBoard } = makeMove(board, r, c, aiPlayerColor);
          setBoard(newBoard);
          const nextTurn: Player = aiPlayerColor === 'black' ? 'white' : 'black';
          handleTurnTransition(newBoard, nextTurn);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, turn, gameMode, aiPlayerColor, aiDifficulty, gameOver]);

  const resetGame = () => {
    setBoard(createInitialBoard());
    setTurn('black');
    setPassMessage(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Othello (オセロ)</h1>
      </header>
      <main className="app-main">
        <GameInfo
          scores={scores}
          turn={turn}
          isGameOver={gameOver}
          winner={winner}
          passMessage={passMessage}
        />
        <Board
          board={board}
          validMoves={validMoves}
          onSquareClick={handleSquareClick}
        />
        <Controls
          gameMode={gameMode}
          setGameMode={setGameMode}
          aiDifficulty={aiDifficulty}
          setAiDifficulty={setAiDifficulty}
          aiPlayerColor={aiPlayerColor}
          setAiPlayerColor={(color) => {
            setAiPlayerColor(color);
            resetGame();
          }}
          onReset={resetGame}
        />
      </main>
    </div>
  );
}

export default App;
