import React from 'react';
import { useGameStore } from '../store/gameStore';
import { History as HistoryIcon, Clock } from 'lucide-react';

export const History: React.FC = () => {
  const { history } = useGameStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <HistoryIcon className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Recent Updates</h2>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {history.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-blue-600">{entry.playerName}</span>
              <span className="font-mono bg-gray-200 px-2 py-1 rounded text-lg">
                {entry.character}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {new Date(entry.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};