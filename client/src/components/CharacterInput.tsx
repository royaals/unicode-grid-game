import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { socketService } from '../services/socket';
import { useTimer } from '../hooks/useTimer';
import { Send } from 'lucide-react';

export const CharacterInput: React.FC = () => {
  const [character, setCharacter] = useState('');
  const { selectedCell, player } = useGameStore();
  const { timeLeft, isRunning, startTimer } = useTimer(60000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!character || !selectedCell || !player || isRunning) return;
    
    socketService.submitCharacter(selectedCell, character);
    setCharacter('');
    startTimer();
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value.slice(0, 1))}
            className="flex-1 h-12 text-center text-xl border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            maxLength={1}
            placeholder="Enter a character"
            disabled={!selectedCell || !player || isRunning}
          />
          <button
            type="submit"
            disabled={!character || !selectedCell || !player || isRunning}
            className="px-6 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit
          </button>
        </div>
        {isRunning && (
          <div className="text-sm text-gray-500">
            Cooldown: {Math.ceil(timeLeft / 1000)}s
          </div>
        )}
      </form>
    </div>
  );
};