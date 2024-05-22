import React from 'react';
import './Cell.css';

const colors = [
  '#f0f0f0',
  '#ffcccc',
  '#ccffcc',
  '#ccccff',
  '#ffffcc',
  '#ccffff',
  '#ffccff',
  '#cccccc',
  '#f0f0f0',
];

function Cell({ value, color, onClick }) {
  return (
    <div
      className="cell"
      onClick={onClick}
      style={{ backgroundColor: colors[color % colors.length] }}
    >
      {value === 'Q' ? '♛' : value}
    </div>
  );
}

export default Cell;
