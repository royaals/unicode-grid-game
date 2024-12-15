import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Users } from 'lucide-react';

export const PlayerList: React.FC = () => {
  const { players } = useGameStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Players Online ({players.length})</h2>
      </div>
      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <span>{player.name}</span>
            {player.cooldown && (
              <span className="text-sm text-gray-500">
                Cooldown: {Math.ceil(player.cooldown / 1000)}s
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};