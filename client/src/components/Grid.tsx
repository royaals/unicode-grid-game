import React from 'react';
import { useGameStore } from '../store/gameStore';

export const Grid: React.FC = () => {
  const { grid, selectedCell, setSelectedCell, player } = useGameStore();

  const handleCellClick = (row: number, col: number) => {
    if (!player) return;
    setSelectedCell([row, col]);
  };

  return (
    <div className="space-y-4">
      {selectedCell && (
        <p className="text-sm text-gray-600">
          Selected position: Row {selectedCell[0] + 1}, Column {selectedCell[1] + 1}
        </p>
      )}
      <div className="grid grid-cols-10 gap-1 bg-white rounded-lg shadow-lg p-4">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square flex items-center justify-center text-xl border-2
                ${cell.character ? 'bg-gray-50' : 'bg-white'}
                ${selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
                  ? 'border-blue-500'
                  : 'border-gray-200'}
                hover:bg-gray-50 transition-colors duration-200
              `}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.character || ''}
            </button>
          ))
        ))}
      </div>
    </div>
  );
};