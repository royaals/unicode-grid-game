import React, { useState } from 'react';
import { Grid } from './components/Grid';
import { PlayerList } from './components/PlayerList';
import { History } from './components/History';
import { CharacterInput } from './components/CharacterInput';
import { useGameStore } from './store/gameStore';
import { Play } from 'lucide-react';
import { socketService } from './services/socket';

function App() {
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [name, setName] = useState('');
  const { player, setPlayer } = useGameStore();
  const [error, setError] = useState<string | null>(null);

  const handlePlayClick = () => {
    setShowNamePrompt(true);
    setError(null);
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      const player = await socketService.connect(name.trim());
      setPlayer(player);
      setShowNamePrompt(false);
    } catch (err) {
      setError('Failed to connect to the game server. Please try again.');
    }
  };

  if (!player) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {showNamePrompt ? (
          <form onSubmit={handleNameSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded mb-4"
              placeholder="Your name"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Start Playing
            </button>
          </form>
        ) : (
          <button
            onClick={handlePlayClick}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          >
            <Play className="w-6 h-6" />
            Play Online
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Unicode Grid Game</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            <Grid />
            <div className="flex justify-center flex-col items-center space-y-4">
              <CharacterInput />
            </div>
          </div>
          <div className="space-y-8">
            <PlayerList />
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;