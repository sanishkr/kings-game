import React from 'react';
import Cell from './Cell';
import './Board.css';

function Board({ board, colors, onCellClick }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              color={colors[rowIndex][colIndex]}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
