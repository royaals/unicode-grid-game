import { create } from 'zustand';
import { Player, GridCell, GridUpdate } from '../types/game';

interface GameState {
  player: Player | null;
  players: Player[];
  grid: GridCell[][];
  selectedCell: [number, number] | null;
  history: GridUpdate[];
  isConnected: boolean;
  setPlayer: (player: Player) => void;
  setPlayers: (players: Player[]) => void;
  setGrid: (grid: GridCell[][]) => void;
  setSelectedCell: (cell: [number, number] | null) => void;
  addHistoryEntry: (entry: GridUpdate) => void;
  setIsConnected: (connected: boolean) => void;
}

const createEmptyGrid = (): GridCell[][] => {
  return Array(10).fill(null).map(() =>
    Array(10).fill(null).map(() => ({
      character: '',
      playerId: null,
      timestamp: null
    }))
  );
};

export const useGameStore = create<GameState>((set) => ({
  player: null,
  players: [],
  grid: createEmptyGrid(),
  selectedCell: null,
  history: [],
  isConnected: false,
  setPlayer: (player) => set({ player }),
  setPlayers: (players) => set({ players }),
  setGrid: (grid) => set({ grid }),
  setSelectedCell: (cell) => set({ selectedCell: cell }),
  addHistoryEntry: (entry) => set((state) => ({ 
    history: [entry, ...state.history].slice(0, 50)
  })),
  setIsConnected: (isConnected) => set({ isConnected })
}));