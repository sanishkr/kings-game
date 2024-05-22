import React, { useState, useEffect } from 'react';
import Board from './Board';
import Controls from './Controls';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(generateInitialBoard());
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (isValidBoard(gameState.board, gameState.colors)) {
      setHasWon(true);
    }
  }, [gameState]);

  const handleCellClick = (row, col) => {
    if (hasWon) return; // Do not allow clicks if the game is already won

    const newBoard = gameState.board.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return cell === 'Q' ? '' : 'Q';
        }
        return cell;
      })
    );

    const newGameState = { ...gameState, board: newBoard };
    setGameState(newGameState);
  };

  console.log({ gameState });
  return (
    <div className="App">
      <h1>Queens Puzzle</h1>
      <Board
        board={gameState.board}
        colors={gameState.colors}
        onCellClick={handleCellClick}
      />
      {hasWon && (
        <div className="win-message">Congratulations! You have won!</div>
      )}
    </div>
  );
}

function generateInitialBoard() {
  const size = Math.floor(Math.random() * 6) + 5; // Random size between 5 and 10
  console.log({ size });
  const board = Array.from({ length: size }, () => Array(size).fill(''));
  console.table(board);
  const colors = generateColorZones(size);
  placeInitialQueens(board, colors);
  console.table(colors);
  return { board, colors };
}

function generateColorZones(size) {
  const colors = Array.from({ length: size }, () => Array(size).fill(null));
  let currentColor = 0;

  const floodFill = (row, col, color) => {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    const stack = [{ row, col }];
    while (stack.length > 0) {
      const { row, col } = stack.pop();
      if (
        row >= 0 &&
        row < size &&
        col >= 0 &&
        col < size &&
        colors[row][col] === null
      ) {
        colors[row][col] = color;
        directions.forEach(([dx, dy]) =>
          stack.push({ row: row + dx, col: col + dy })
        );
      }
    }
  };

  for (let i = 0; i < size; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * size);
    } while (colors[row][col] !== null);

    floodFill(row, col, currentColor);
    currentColor++;
  }

  return colors;
}

function placeInitialQueens(board, colors) {
  const size = board.length;
  const placedQueens = new Set();

  for (let color = 0; color < size; color++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * size);
    } while (colors[row][col] !== color || placedQueens.has(`${row},${col}`));

    board[row][col] = 'Q';
    placedQueens.add(`${row},${col}`);
  }
}

function isValidBoard(board, colors) {
  const size = board.length;
  const rows = new Set();
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  const colorZones = {};

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 'Q') {
        if (
          rows.has(r) ||
          cols.has(c) ||
          diag1.has(r - c) ||
          diag2.has(r + c)
        ) {
          return false;
        }
        rows.add(r);
        cols.add(c);
        diag1.add(r - c);
        diag2.add(r + c);

        const color = colors[r][c];
        if (!colorZones[color]) {
          colorZones[color] = 0;
        }
        colorZones[color]++;
        if (colorZones[color] > 1) {
          return false;
        }
      }
    }
  }

  return Object.keys(colorZones).length === size;
}

export default App;
